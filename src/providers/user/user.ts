import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable()
export class UserProvider {

  public db: firebase.firestore.Firestore = firebase.firestore();

  constructor(
    private storage: Storage,
    private af: AngularFireAuth,
  ) {
    
  }

  signInWithEmailAndPassword(email, password) {
    return this.af.auth.signInWithEmailAndPassword(email, password).then(() => {
      return this.db.collection('user').doc(email).set({}).then(() => this.storage.set('logged', true));
    });
  }

  isLogged() {
    return this.storage.get('logged');
  }

  getCurrentUser() {
    return this.af.authState;
  }

}
