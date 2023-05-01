import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth.service";
import * as cluster from "cluster";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() currentPage: string = '';
  @Input() loggedInUser?: firebase.default.User | null;
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

  constructor(private authService: AuthService, private userService: UserService) {
  }

  close(logout?: boolean) {
    this.onCloseSidenav.emit(true);
    if (logout === true) {
      this.onLogout.emit(logout);
    }
  }

  logout(_?: boolean) {
    this.authService.logout().then(() => {
      this.userService.getByIdOne(this.loggedInUser?.uid as string).subscribe((u: User | null) =>{
        if(u){
          u.active = false;
          this.userService.update(u);
        }
      })
    }).catch(error => {
      console.error(error);
    });
  }
}
