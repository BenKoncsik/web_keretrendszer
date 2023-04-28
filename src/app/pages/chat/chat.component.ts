import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {ChatService} from "../../shared/services/chat.service";
import {ChatItem} from "../../shared/models/ChatItem";
import {User} from "../../shared/models/User";
import {Message_1} from "../../shared/models/Message_1";
import {Observable} from "rxjs";
import {QuerySnapshot} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  private chatId?: string;
  private group?: boolean;
  public chat?: ChatItem;
  public loggedUser: User =  JSON.parse(localStorage.getItem('user') as string);
  private anotherUsers: User[] = [];
  public messageInput: string = '';

  constructor(private route: ActivatedRoute, private userService: UserService, private chatService: ChatService,  private router: Router) {}
    ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      if (params['cid']) {
        this.chatId = params['cid'];
        if(params['group']) this.group = params['group'] == 'true';
        else  this.router.navigateByUrl("/main");
        if(!this.group){
          if (this.chatId != null) {
            this.userService.getByEmail(this.chatId).subscribe(u => {
              if (!u.empty) {
                const userDoc = u.docs[0];
                const userData: User = userDoc.data() as User;
                this.anotherUsers.push(userData);
                this.getChat();
              }
            });
          }
        }
      }

    });
  }

  private getChat(){
    let emails: string[] = [];
    emails.concat(this.anotherUsers.map(u => u.email as string));
    emails.push(this.loggedUser.email as string);
    let chats = this.chatService.getPrivate(emails);
    if(chats == null){
      // this.router.navigateByUrl('/chat?cid='+this.chatId+"&group="+this.group);
      this.router.navigateByUrl('/main');
    }else {
      chats.subscribe(chatDocs => {
        if (!chatDocs.empty) {
          const chatD = chatDocs.docs[0];
          this.chat = chatD.data() as ChatItem;
        }
      })
    }
  }
  sendMessage(): void {
    if (this.messageInput.trim()) {
      let newMessage: Message_1 = {
        text: this.messageInput,
        send: new Date(),
        sender: this.loggedUser.email,
        imageUrl: ""
      }
      if(this.chat) {
        this.chat?.messages.push(newMessage);
        this.chatService.update(this.chat);
        this.messageInput = '';
      }
    }
  }

}
