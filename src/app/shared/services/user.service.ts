import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {AngularFirestore} from "@angular/fire/compat/firestore";




@Injectable({
  providedIn: 'root'
})
export class UserService {
  private collectionName = 'UserItem';

  constructor(private storage: AngularFirestore) {}

  add(user: User){
    // const docRef = this.storage.collection<User>(this.collectionName).doc();
    user.id = this.storage.createId();
    return this.storage.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getAll() {
    return this.storage.collection<User>(this.collectionName).snapshotChanges()
  }

  getById(id: string) {
    return this.storage.collection<User>(this.collectionName).doc(id).valueChanges();
  }
  update(user: User) {
    return this.storage.collection<User>(this.collectionName).doc(user.id).update(user);
  }
}
