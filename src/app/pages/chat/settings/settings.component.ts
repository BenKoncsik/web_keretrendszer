import {Component, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges} from '@angular/core';
import {ChatItem} from "../../../shared/models/ChatItem";
import {User} from "../../../shared/models/User";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {group} from "@angular/animations";
import {UserService} from "../../../shared/services/user.service";
import {user} from "@angular/fire/auth";
import {ChatService} from "../../../shared/services/chat.service";
import {Router} from "@angular/router";
import {ActiveChatService} from "../../../shared/services/active-chat.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnChanges, OnDestroy{

  @Input() chat: ChatItem | undefined;
  @Input() loggedUser: User | undefined;
  @Input() dialog: boolean | undefined = false;
  public title: string = "";
  public chatUser: User[] = [];
  private subscriptions: Subscription[] = [];


  constructor(private userService: UserService,
              private chatService: ChatService,
              private router: Router,
              @Optional() private dialogRef: MatDialogRef<SettingsComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private activeChatService: ActiveChatService) {
    if(data){
      this.chat = data.chat;
      this.loggedUser = data.loggedUser;
      this.dialog = data.dialog;
    }
  }


  ngOnInit(): void {
    this.settSettingsTitle();
  }
  private settSettingsTitle(){
    this.title = "";
    if (this.chat) {
      if (this.chat.group) {
        if(this.chat.name) this.title = this.chat.name;
      }
      this.chatUser = [];
      for (let email of this.chat.members){
        this.subscriptions.push(
        this.userService.getByEmail(email).subscribe(user =>{
            if (!user.empty) {
              const userDoc = user.docs[0];
              const userData: User = userDoc.data() as User;
              if(!this.chatUser.includes(userData) && !this.chatUser.find(u => u.email == userData.email)) this.chatUser.push(userData);
            }
        }))
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['chat']){
      this.settSettingsTitle();
    }
  }

  protected readonly group = group;
    changeSelectedUser(updatedUser: User[]) {
    if(this.chat) {
      this.chat.members = updatedUser.map(u => u.email);
      this.chatUser = updatedUser;
      if(!this.dialog){
        if(updatedUser !== undefined && updatedUser.length > 2)
        this.chatService.update(this.chat);
      }
    }
  }

  changeGroupName(newName: any) {
    if(this.chat && this.chat.group){
      this.chat.name = newName;
    }
  }


  delete() {
      if(this.chat) {
        this.subscriptions.push(
        this.activeChatService.getById(this.loggedUser!.id).subscribe(activeChat =>{
          if(activeChat){
            activeChat.activeChats = activeChat.activeChats.filter(chat => chat.cId !== this.chat?.id)
            this.activeChatService.update(activeChat);
          }
        }))
        this.chatService.delete(this.chat.id);
        if (this.dialogRef) {
          this.dialogRef.close();
        }
        this.router.navigateByUrl("/main");
      }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
