import { Injectable, NgModule } from '@angular/core';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';

import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  user: firebase.User;
  userName: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) { 
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }

      this.getUser().valueChanges().subscribe((a: any) => {
        this.userName = a.userName;
      });
    });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
      email: email,
    });
  }

  getTimeStamp() {
    const now = new Date();
    
    const date = now.getUTCFullYear() + '/' +
    (now.getUTCMonth() + 1) + '/' +
    now.getUTCDate();

    const time = now.getUTCHours() + 8  + ':' + //Conversion to EDT time
      now.getUTCMinutes() + ':' +
      now.getUTCSeconds();
    
    return date + ' ' + time;
  }

  getMessages(): AngularFireList<ChatMessage> {
    // query to create our message feed binding
    return this.db.list(
      'messages', ref => {
        return ref.limitToLast(25).orderByKey();
    })
  }
}
