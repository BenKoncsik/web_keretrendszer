import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import {UserService} from "./shared/services/user.service";
import {User} from "./shared/models/User";
import {user} from "@angular/fire/auth";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  page = '';
  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null;

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {

  }

  ngOnInit() {

    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });
    this.authService.isUserLoggedIn().subscribe(user => {
      console.log(user);
      this.loggedInUser = user;
      console.log("loged user: " + user != null)
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
    });
  }

  changePage(selectedPage: string) {
    // this.page = selectedPage;
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
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
