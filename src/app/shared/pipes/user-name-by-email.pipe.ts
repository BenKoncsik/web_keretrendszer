import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserService} from "../services/user.service";
import {User} from "../models/User";

@Pipe({
  name: 'userNameByEmail'
})
export class UserNameByEmailPipe implements PipeTransform {

  constructor(private userService: UserService) {}

  transform(email: string): Observable<string | null> {
    return this.userService.getByEmail(email).pipe(
      map(querySnapshot => {
        const userDoc = querySnapshot.docs[0];
        if (userDoc) {
          const user = userDoc.data() as User;
          return user.name;
        }
        return null;
      })
    );
  }
}
