import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";
import 'firebase/compat/firestore';
import {Router} from "@angular/router";
import {ActiveChat} from "../../shared/models/ActiveChat";
import {ActiveChatService} from "../../shared/services/active-chat.service";
import {Subscription} from "rxjs";



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy{
  public users: User[] = [];
  public loggedUser: User = JSON.parse(localStorage.getItem('user') as string);
  private subscriptions: Subscription[] = [];
  protected readonly Date = Date;
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.subscriptions.push(
    this.userService.getAllOrderByActive().subscribe(users => {
      console.log(users.length)
      this.users = users;
    }));
  }

  startChat(email: string): void{
    this.router.navigateByUrl('/chat?cid='+email+"&group=false");
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


}
