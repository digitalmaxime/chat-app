import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;
  

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.user = afAuth.authState;
    this.authState = this.user;
    console.log(this.user);
    console.log(this.authState);
   }
  
  get currentUserId(): string {
    console.log(this.authState);
    return this.authState !== null ? this.authState.uid : '';
  }

  authUser() {
    return this.user;
  }
  
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user.user;
        const status = 'online';
        this.setUserStatus(status);
        this.router.navigate(['chat']);
      })
  }

  logout() {
    this.setUserStatus('offline');
    this.afAuth.signOut();
    this.router.navigate(['login']);
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user.user; //DIFFERENCE AVEC LE TUTORIEL
        console.log(user);
        console.log(this.authState);
        const status = 'online';
        this.setUserData(email, displayName, status);
      }).catch(error => console.log(error));
  }

  setUserData(email: string, displayName: string, status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email,
      userName: displayName,
      status: status
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  setUserStatus(status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      status: status
    };

    let db = firebase.database();
    db.ref(path).update(data)
      .catch(error => console.log(error));
  }
}
