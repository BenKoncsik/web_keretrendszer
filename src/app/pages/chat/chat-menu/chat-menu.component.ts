import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../shared/models/User";
import {user} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {ChatItem} from "../../../shared/models/ChatItem";
import {ActiveChat} from "../../../shared/models/ActiveChat";
import {ActiveChatService} from "../../../shared/services/active-chat.service";
import {activate} from "@angular/fire/remote-config";
import {ActiveMessageListItem} from "../../../shared/models/ActiveMessageListItem";

@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.scss']
})
export class ChatMenuComponent implements OnInit{

  isOpen = true;
  @Input() users!: User[];
  @Input() groups!: ChatItem[];
  @Output() switchChat = new EventEmitter<string[]>()
  @Input() selectedChat: string | null = null;

  @Input() activeChat!: ActiveChat;

  public loggedUser: User =  JSON.parse(localStorage.getItem('user') as string);


  constructor(private router: Router, private activeChatService: ActiveChatService) {
  }

  protected readonly user = user;

  openChat(cId: string, group: boolean) {
    this.selectedChat = cId;
    this.switchChat.emit([cId, 'false'])
    this.router.navigateByUrl("/chat?cid="+cId+"&group="+group);
    this.switchChat.emit();
  }

  ngOnInit(): void {



  }
}
