import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/User";
import {user} from "@angular/fire/auth";
import {MatSnackBar} from "@angular/material/snack-bar";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService, private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  async login() {
    this.loading = true;
    if(this.email.value == null || this.password.value == null){
      this.snackBar.open("Email or password null!");
      return;
    }
    this.authService.login(this.email.value, this.password.value).then(cred => {
      console.log(cred);
      this.userService.getByIdOne(cred.user?.uid as string).subscribe((u: User | null) =>{
        if(u){
          u.active = true;
          u.lastActive = new Date()
          this.userService.update(u);
        }
      })
      this.loading = false;
      this.router.navigateByUrl('/main');
    }).catch(error => {
      console.error(error);
      this.snackBar.open("Email or password not valid!");
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }


}
