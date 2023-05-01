import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../models/User";
import {MessageWall} from "../models/MessageWall";
import {ChatItem} from "../models/ChatItem";

@Injectable({
  providedIn: 'root'
})
export class MessageWallService {
  private collectionName = 'messageWall';

  constructor(private store: AngularFirestore) { }

  add(messageWall: MessageWall){
    messageWall.id = this.store.createId();
    return this.store.collection<MessageWall>(this.collectionName).doc(messageWall.id).set(messageWall);
  }

  getAll(){
    return this.store.collection<MessageWall>(this.collectionName, ref =>
      ref.orderBy("send", "desc")).valueChanges();
  }
}
