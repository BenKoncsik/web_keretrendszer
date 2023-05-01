import { Injectable } from '@angular/core';
import {AngularFirestore, QuerySnapshot} from "@angular/fire/compat/firestore";
import {User} from "../models/User";
import {ChatItem} from "../models/ChatItem";
import {doc} from "@angular/fire/firestore";
import {catchError, empty, EMPTY, forkJoin, map, Observable, of} from "rxjs";
import {Message_1} from "../models/Message_1";
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private collectionName = 'messages';
  constructor(private store: AngularFirestore) { }

  addNew(chatItem: ChatItem): string{
    chatItem.id = this.store.createId();
    this.store.collection<ChatItem>(this.collectionName).doc(chatItem.id).set(chatItem);
    return chatItem.id;
  }

  async getPrivate(email: string){
    return this.store.collection<ChatItem>(this.collectionName, ref =>
     ref.where('group', '==', false)
       .where('members', 'array-contains', email)).get();
    }

  update(chatItem: ChatItem){
    return this.store.collection<ChatItem>(this.collectionName).doc(chatItem.id).update(chatItem);
  }

  getById(id: string){
    return this.store.collection<ChatItem>(this.collectionName).doc(id).valueChanges();
  }


  getGroups(email: string){
    return this.store.collection<ChatItem>(this.collectionName, ref =>
      ref.where('group', '==', true).where('members', 'array-contains', email)).valueChanges();
  }

  delete(id: string){
    return this.store.collection(this.collectionName).doc(id).delete();
  }
}
