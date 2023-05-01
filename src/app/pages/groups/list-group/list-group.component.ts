import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../../shared/services/chat.service";
import {ChatItem} from "../../../shared/models/ChatItem";
import {User} from "../../../shared/models/User";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {user} from "@angular/fire/auth";
import {ActiveChat} from "../../../shared/models/ActiveChat";
import {ActiveChatService} from "../../../shared/services/active-chat.service";
import {activate} from "@angular/fire/remote-config";

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent implements OnInit{

  public groupsChat: ChatItem[] = [];
  public activeChats!: ActiveChat;
  private loggedUser: User = JSON.parse(localStorage.getItem('user') as string);
  constructor(private chatService: ChatService, private router: Router, private _snackBar: MatSnackBar, private activeChatService: ActiveChatService) {}

  ngOnInit(): void {
    this.loggedUser.id = JSON.parse(localStorage.getItem('user') as string).uid;
    this.chatService.getGroups(this.loggedUser.email).subscribe(chats => {
      this.groupsChat = chats;
    });

    this.activeChatService.getById(this.loggedUser.id).subscribe(activateChat =>{
      if(activateChat){
        this.activeChats = activateChat;
      }
    });
  }


  protected readonly user = user;

  open(chat: ChatItem) {
    this.router.navigateByUrl('/chat?cid='+chat.id+"&group=true");
  }

  shouldDisplaySubtitle(chatId: string): boolean {
    if (!this.activeChats || !this.activeChats.activeChats) {
      return false;
    }
    return !!this.activeChats.activeChats.find(ac => ac.cId === chatId);
  }

  shouldDisplayUserEmail(chatId: string): string {
    if(this.activeChats){
      let display = this.activeChats.activeChats.find(chat => chat.cId == chatId)
      if(display){
        return display.userEmail;
      }
    }
    return "";
  }

  shouldDisplayLastMessage(chatId: string): string {
    if(this.activeChats){
      let display = this.activeChats.activeChats.find(chat => chat.cId == chatId)
      if(display){
          return display.lastMessage;
      }
    }
    return "";
  }
}
