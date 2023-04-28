import { Injectable } from '@angular/core';
import {AngularFirestore, QuerySnapshot} from "@angular/fire/compat/firestore";
import {User} from "../models/User";
import {ChatItem} from "../models/ChatItem";
import {doc} from "@angular/fire/firestore";
import {catchError, empty, EMPTY, forkJoin, map, Observable, of} from "rxjs";
import {Message_1} from "../models/Message_1";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private collectionName = 'messages';
  constructor(private store: AngularFirestore) { }

  addNew(chatItem: ChatItem){
    chatItem.id = this.store.createId();
    return this.store.collection<ChatItem>(this.collectionName).doc(chatItem.id).set(chatItem);
  }

  getPrivate(emails: string[]): Observable<QuerySnapshot<ChatItem>> | null{
    const chatQueries: Observable<QuerySnapshot<ChatItem>>[] = [];
    try {
      const reversedEmails = [...emails].reverse();
      chatQueries.push(
        this.store.collection<ChatItem>(this.collectionName, ref =>
          ref.where('group', '==', false).where('members', 'array-contains', emails[0]).where('members', 'array-contains', emails[1])).get()
      );

      chatQueries.push(
        this.store.collection<ChatItem>(this.collectionName, ref =>
          ref.where('group', '==', false).where('members', 'array-contains', reversedEmails[0]).where('members', 'array-contains', reversedEmails[1])).get()
      );

      return forkJoin(chatQueries).pipe(
        map(chatQueryResults => {
          for (const chatQueryResult of chatQueryResults) {
            if (!chatQueryResult.empty) {
              return chatQueryResult;
            }
          }
          return chatQueryResults[0];
        })
      );
    }catch (e){
      let newChat: ChatItem = {
        id: "",
        name: "",
        members: emails,
        messages: [],
        group: false
      }
      this.addNew(newChat).then();
      return null;
    }
  }

  update(chatItem: ChatItem){
    return this.store.collection<ChatItem>(this.collectionName).doc(chatItem.id).update(chatItem);
  }

}
