import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  users: User[] = [];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    // this.userService.getAll().subscribe(users => {
    //   // this.users = users;
    // });
  }
}
