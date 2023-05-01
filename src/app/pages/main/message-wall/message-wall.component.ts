import {Component, OnInit} from '@angular/core';
import {MessageWall} from "../../../shared/models/MessageWall";
import {MessageWallService} from "../../../shared/services/message-wall.service";
import {Message_1} from "../../../shared/models/Message_1";
import {User} from "../../../shared/models/User";

@Component({
  selector: 'app-message-wall',
  templateUrl: './message-wall.component.html',
  styleUrls: ['./message-wall.component.scss']
})
export class MessageWallComponent implements OnInit{

  public messageWall: MessageWall[] = [];
  public messageInput: string = '';
  public loggedUser: User =  JSON.parse(localStorage.getItem('user') as string);
  constructor(private messageWallService: MessageWallService) {
  }

  ngOnInit(): void {
    this.messageWallService.getAll().subscribe(mes =>{
      if(mes){
        this.messageWall = mes;
      }
    })
  }


  sendMessageEmit() {
    const newMessage: MessageWall = {
      id: "",
      text: this.messageInput,
      send: new Date(),
      sender: this.loggedUser.email,
    }
    this.messageWallService.add(newMessage);
    this.messageInput = "";
  }




}
