import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import {Router} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/User";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });

  constructor(private router: Router, private location: Location, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {}

  onSubmit() {
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;

    if (email !== null && email !== undefined && password !== null && password !== undefined) {
      this.authService.signup(email, password).then(cred => {
        console.log(cred);
        const user: User = {
         id: cred.user?.uid as string,
         email: this.signUpForm.get('email')?.value as string,
         name: this.signUpForm.get('name.firstname')?.value + " " + this.signUpForm.get('name.lastname')?.value as string,
         lastActive: new Date(),
          active: false
        };

        this.userService.add(user).then(_ => {
          console.log("User add ok");
        }).catch(error =>{
          console.log(error)
        });
        this.router.navigateByUrl('/login');
      }).catch(error => {
        console.error(error);
      });
    } else {

    }
  }


  goBack() {
    this.location.back();
  }
}
