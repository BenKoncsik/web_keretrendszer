import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {Router} from "@angular/router";



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  public users: User[] = [];
  public loggedUser: User = JSON.parse(localStorage.getItem('user') as string);

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  startChat(email: string): void{
    this.router.navigateByUrl('/chat?cid='+email+"&group=false");
  }
}
