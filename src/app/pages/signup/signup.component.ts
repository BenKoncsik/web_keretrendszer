import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
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

  constructor(private location: Location, private authService: AuthService) {
  }

  ngOnInit(): void {}

  onSubmit() {
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;

    if (email !== null && email !== undefined && password !== null && password !== undefined) {
      this.authService.signup(email, password).then(cred => {
        console.log(cred);
      }).catch(error => {
        console.error(error);
      });
    } else {
      // Kezelje a hibás bevitelt, például jelenítse meg egy hibaüzenetet.
    }
  }


  goBack() {
    this.location.back();
  }
}
