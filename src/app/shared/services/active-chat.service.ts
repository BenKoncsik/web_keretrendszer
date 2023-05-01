import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ActiveChat} from "../models/ActiveChat";
import {map, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ActiveChatService {
  private collectionName = 'activeChat';

  constructor(private store: AngularFirestore) { }

  addNew(activeChats: ActiveChat){
    this.store.collection<ActiveChat>(this.collectionName).doc(activeChats.uid).set(activeChats);
  }


  update(activeChats: ActiveChat){
    return this.store.collection<ActiveChat>(this.collectionName).doc(activeChats.uid).set(activeChats);
  }

  getById(id: string){
    return this.store.collection<ActiveChat>(this.collectionName).doc(id).valueChanges();
  }


  getActiveChat(uId: string){
    return this.store.collection<ActiveChat>(this.collectionName).valueChanges();
  }

  existByChatId(uid: string, cId: string): Observable<boolean>{
    return this.store.collection<ActiveChat>(this.collectionName).doc(uid).valueChanges({idField: 'cId'}).pipe(
      map(items => !!items?.activeChats.find(chat => chat.cId === cId))
    );
  }

  delete(id: string){
    return this.store.collection(this.collectionName).doc(id).delete();
  }
}
