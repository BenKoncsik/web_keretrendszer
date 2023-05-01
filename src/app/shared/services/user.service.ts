import {Injectable, Query} from '@angular/core';
import {User} from "../models/User";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Firestore} from "@angular/fire/firestore";
import {first, from, map, Observable} from "rxjs";
import {formatDate} from "@angular/common";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


type Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private collectionName = 'UserItem';

  constructor(private store: AngularFirestore) {}

  add(user: User){
    return this.store.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getAll() {
    return this.store.collection<User>(this.collectionName).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data: User = a.payload.doc.data() as User;
         if (data.lastActive) {
           const timestamp: Timestamp = data.lastActive as Timestamp;
           data.lastActive = timestamp.toDate();
         }

        return data;
      }))
    );
  }

  getAllOrderByLastActive() {
    return this.store.collection<User>(this.collectionName, ref => ref.orderBy('lastActive', 'desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data: User = a.payload.doc.data() as User;
        if (data.lastActive) {
          const timestamp: Timestamp = data.lastActive as Timestamp;
          data.lastActive = timestamp.toDate();
        }

        return data;
      }))
    );
  }

  getAllOrderByActive() {
    return this.store.collection<User>(this.collectionName, ref => ref.where('active', '==', true).orderBy('lastActive', 'desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data: User = a.payload.doc.data() as User;
        if (data.lastActive) {
          const timestamp: Timestamp = data.lastActive as Timestamp;
          data.lastActive = timestamp.toDate();
        }

        return data;
      }))
    );
  }
  getById(id: string) {
    return this.store.collection<User>(this.collectionName).doc(id).valueChanges();
  }


  getByEmail(email: string){
    return this.store.collection<User>(this.collectionName, ref => ref.where('email', '==', email).limit(1)).get()
  }

  getByIdOne(id: string): Observable<User | null> {
    return from(this.store.collection<User>(this.collectionName).doc(id).get()).pipe(
      first(),
      map((docSnapshot) => {
        if (docSnapshot.exists) {
          return docSnapshot.data() as User;
        } else {
          return null;
        }
      })
    );
  }
  update(user: User) {
    return this.store.collection<User>(this.collectionName).doc(user.id).update(user);
  }
}
