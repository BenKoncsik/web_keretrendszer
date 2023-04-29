import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../../shared/services/chat.service";
import {ChatItem} from "../../../shared/models/ChatItem";
import {User} from "../../../shared/models/User";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent implements OnInit{

  public groupsChat: ChatItem[] = [];
  private loggedUser: User = JSON.parse(localStorage.getItem('user') as string);
  constructor(private chatService: ChatService, private router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.chatService.getGroups(this.loggedUser.email).subscribe(chats => {
      this.groupsChat = chats;
    })
  }


  protected readonly user = user;

  open(chat: ChatItem) {
    this.router.navigateByUrl('/chat?cid='+chat.id+"&group=true");
  }
}
