import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../shared/models/User";
import {user} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {ChatItem} from "../../../shared/models/ChatItem";

@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.scss']
})
export class ChatMenuComponent {

  isOpen = true;
  @Input() users!: User[];
  @Input() groups!: ChatItem[];
  @Output() switchChat = new EventEmitter<string[]>()
  @Input() selectedChat: string | null = null;


  constructor(private router: Router) {
  }

  protected readonly user = user;

  openChat(cId: string, group: boolean) {
    this.selectedChat = cId;
    this.switchChat.emit([cId, 'false'])
    this.router.navigateByUrl("/chat?cid="+cId+"&group="+group);
    this.switchChat.emit();
  }
}
