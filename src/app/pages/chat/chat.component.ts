import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {ChatService} from "../../shared/services/chat.service";
import {ChatItem} from "../../shared/models/ChatItem";
import {User} from "../../shared/models/User";
import {Message_1} from "../../shared/models/Message_1";
import {ChatMenuComponent} from "./chat-menu/chat-menu.component";
import { FlexLayoutModule } from '@angular/flex-layout';
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import {
  createJitResourceTransformer
} from "@angular-devkit/build-angular/src/builders/browser-esbuild/angular/jit-resource-transformer";
import {MatDialog} from '@angular/material/dialog';
import {SettingsComponent} from "./settings/settings.component";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  protected chatId!: string;
  private group!: boolean;
  public chat!: ChatItem | undefined;
  public loggedUser: User =  JSON.parse(localStorage.getItem('user') as string);
  private anotherUsers: User[] = [];
  public messageInput: string = '';
  @ViewChild(ChatMenuComponent)
  private menuComponent!: ChatMenuComponent;
  public users!: User[];
  public groups!: ChatItem[];
  public isVisibleOnXs: boolean = true;
  public selectedIndex: number = 0;
  @ViewChild('scrollContainer', { static: false, read: ElementRef }) private scrollContainer!: ElementRef;

  constructor(private media: MediaObserver, private route: ActivatedRoute, private userService: UserService, private chatService: ChatService,  private router: Router, private matDialog: MatDialog) {

  }
    ngOnInit(): void {
      this.media.asObservable().subscribe(change => {
        this.isVisibleOnXs = !!change.find(media => media.mqAlias == 'xs');
        console.log("xs screen:", this.isVisibleOnXs)
      });



    this.route.queryParams.subscribe(params => {
      if (params['cid']) {
        this.chatId = params['cid'];
        // this.menuComponent.selectedChat = this.chatId;
        if(params['group']) this.group = params['group'] == 'true';
        else  this.router.navigateByUrl("/main");
        if(!this.group){
          if (this.chatId != null) {
            this.loadPrivateChat();
          }
        }else {
          this.getGroupChat();
        }
      }
    });



      this.userService.getAllOrderByLastActive().subscribe(users => {
        this.users = users.filter(u => u.email != this.loggedUser.email);
      });
      this.chatService.getGroups(this.loggedUser.email).subscribe(chats => {
        this.groups = chats;
      })
  }

  private loadPrivateChat(){
    this.userService.getByEmail(this.chatId).subscribe(u => {
      if (!u.empty) {
        this.anotherUsers = [];
        const userDoc = u.docs[0];
        const userData: User = userDoc.data() as User;
        this.anotherUsers.push(userData);
        this.getChat();
      }
    });
  }
  private getChat(){
    let emails: string[] = [];
    emails.push(this.loggedUser.email as string);
    (this.anotherUsers.map(u => emails.push(u.email as string)))
    emails = emails.sort();
    this.chatService.getPrivate(this.loggedUser.email).then(c =>{
      c.subscribe(chats =>{
        if(chats.empty){
          const newChat: ChatItem = {
            id: "",
            name: this.chatId,
            members: emails,
            messages: [],
            group: this.group
          }
         newChat.id = this.chatService.addNew(newChat)
          this.chat = newChat;
          this.subScribeMessage(newChat);
        }else {
          this.chat = undefined;
          for (const chat of chats.docs){
            const sortedEmail: string[] = chat.data().members.sort();
            console.log("array check: ", JSON.stringify(sortedEmail) === JSON.stringify(emails))
             if(JSON.stringify(sortedEmail) === JSON.stringify(emails)){
               this.chat = chat.data();
               this.subScribeMessage(chat.data());
               break;
             }
          }
          if(this.chat == undefined){
            const newChat: ChatItem = {
              id: "",
              name: "",
              members: emails,
              messages: [],
              group: this.group
            }
            newChat.id = this.chatService.addNew(newChat)
            this.chat = newChat;
            this.subScribeMessage(newChat);
          }
        }
      })
    })
  }
  sendMessage(newMessage: Message_1): void {
      if(this.chat) {
        this.chat?.messages.push(newMessage);
        this.chatService.update(this.chat);
        this.messageInput = '';
      }
  }

  subScribeMessage(chatI: ChatItem): void{
    this.chatService.getById(chatI.id).subscribe(chatItem =>{
      if(chatItem !== undefined) {
        this.chat = chatItem;
        this.scrollToBottom();
        setTimeout(() => this.scrollToBottom(), 100);
      }
    })
  }

  switchLoadChat(switchChatLoadData: string[]){
    if (switchChatLoadData && switchChatLoadData.length > 0) {
      this.chatId = switchChatLoadData[0];
      this.group = switchChatLoadData[1] == 'true';
      if(this.group) this.getGroupChat();
      else this.loadPrivateChat();
      this.selectedIndex = 1;
    }
  }

  scrollToBottom(): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }


  private getGroupChat(){
      this.chatService.getById(this.chatId).subscribe(chat =>{
        this.chat = chat;
      });
  }
  openSettings(){
    const dialogRef = this.matDialog.open(SettingsComponent, {
     data:{
       chat: this.chat,
       dialog: true,
       loggedUser: this.loggedUser
     }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
