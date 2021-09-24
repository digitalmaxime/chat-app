import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataSnapshot } from '@angular/fire/database/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;
  

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.user = afAuth.authState;
    this.authState = this.user;
   }
  
  get currentUserId(): string {
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
        const status = 'online';
        this.setUserData(email, displayName, status);
      }).catch(error => {
        switch(error.code) {
          case 'auth/email-already-in-use': 
            throw new Error('Ce courriel est déjà utilisé.')
          case 'auth/invalid-email':
            throw new Error('Cette adresse courriel est invalide.')
          case 'auth/weak-password':
            throw new Error('Ce mot de passe est trop faible. Veuillez choisir un mot de passe ayant minimum 6 caractères.')
        }
      });
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

  userNameExists(userName: string): Promise<DataSnapshot> {
    let db = firebase.database();
    const path = `users`;
    return db.ref(path).orderByChild('userName').equalTo(userName).once("value", snapshot => {
      return snapshot.exists();
    }); 

  }
}
