import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserProvider {

  constructor(
    private storage: Storage,
    private af: AngularFireAuth,
  ) {
    
  }

  signInWithEmailAndPassword(email, password) {
    return this.af.auth.signInWithEmailAndPassword(email, password).then(() => {
      return this.storage.set('logged', true);
    });
  }

  isLogged() {
    return this.storage.get('logged');
  }

}
