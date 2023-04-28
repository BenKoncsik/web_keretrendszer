import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import {Router} from "@angular/router";
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

  constructor(private router: Router, private location: Location, private authService: AuthService) {
  }

  ngOnInit(): void {}

  onSubmit() {
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;

    if (email !== null && email !== undefined && password !== null && password !== undefined) {
      this.authService.signup(email, password).then(cred => {
        console.log(cred);
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
