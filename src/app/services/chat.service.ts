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
  randomData: AngularFireList<Number>;
  chatMessage: ChatMessage;
  user: any;
  userName: string;
  // userName: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) { 
    this.afAuth.authState.subscribe(auth => {
      // if (auth !== undefined && auth !== null) {
      //   this.user = auth;
      // }
    });
  }

  // ngOnInit() {
  //   this.userName.subscribe(
  //     val => { 
  //       console.log('received value from subscribe : ' + val);
  //       this.nameValue = val;
  //     },
  //     error => { console.log('error : ' + error) },
  //     () => { console.log('Completed!')}
  //   )
  // }

  sendMessage(msg: string) {
    console.log('Called sendMessage() with param ' + msg);
    const timestamp = this.getTimeStamp();
    // const email = this.user.email;
    const email = 'test@email.com';
    this.chatMessages = this.getMessages();
    // this.chatMessages.push(new ChatMessage(email, /*this.userName*/'test-name', msg, timestamp));
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: 'fake name',
      email: email,
    });
  }

  getTimeStamp() {
    const now = new Date();
    
    const date = now.getUTCFullYear() + '/' +
    (now.getUTCMonth() + 1) + '/' +
    now.getUTCDate();

    const time = now.getUTCHours() + '/' +
      now.getUTCMinutes() + '/' +
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
