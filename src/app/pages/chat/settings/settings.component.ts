import {Component, Inject, Input, OnChanges, OnInit, Optional, SimpleChanges} from '@angular/core';
import {ChatItem} from "../../../shared/models/ChatItem";
import {User} from "../../../shared/models/User";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnChanges{

  @Input() chat: ChatItem | undefined;
  @Input() loggedUser: User | undefined;
  @Input() dialog: boolean | undefined = false;
  public title: String | undefined = "name";
  protected readonly caches = caches;

  constructor(
               @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
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
        this.title = this.chat.name;
      } else if (this.chat.members && this.loggedUser && this.loggedUser.email) {
        this.title = this.chat.members.filter(u => u !== this.loggedUser!.email)[0];
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['chat']){
      this.settSettingsTitle();
    }
  }

}
