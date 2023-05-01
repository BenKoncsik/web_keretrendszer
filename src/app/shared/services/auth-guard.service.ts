import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {UserService} from "./user.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private authService: AuthService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = JSON.parse(localStorage.getItem('user') as string);
    if (user) {
      //kiszedve mert túl sok a kérés! Amuggy élesbe ez menne.
      this.authService.isUserLoggedIn().subscribe(u =>{
        return u != null;
      })
      return true;
    }
    return false;
  }

}
