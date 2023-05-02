import {Component, OnDestroy} from '@angular/core';
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnDestroy{
  public users: User[] = [];
  public loggedUser: User = JSON.parse(localStorage.getItem('user') as string);
  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.subscriptions.push(
    this.userService.getAll().subscribe(users => {
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
