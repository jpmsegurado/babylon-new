import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import 'firebase/firestore';
/*
  Generated class for the IncomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OutgoingProvider {

  public db: firebase.firestore.Firestore = firebase.firestore();
  
  constructor(
    public af: AngularFireAuth,
    public fs: AngularFirestore,
  ) {
    
  }

  init() {

  }

  add(email, income, id?): Promise<any> {
    if(id != null) {
      return this.db.collection('user').doc(email).collection('outgoings').doc(id).set(income)
    } else {
      return this.db.collection('user').doc(email).collection('outgoings').add(income)
    }
  }

  delete(email, id?): Promise<any> {
    return this.db.collection('user').doc(email).collection('outgoings').doc(id).delete();
  }

  getAll(email) {
    return this.db.collection('user').doc(email).collection('outgoings').get();
  }


  getFiltered(start, end, email) {
    return new Promise((resolve, reject) => {
      this.getAll(email).then((outgoings: any) => {
        resolve(outgoings.docs.map(item => ({...item.data(), id: item.id})).filter((item: any) => {
          if(item.todoMes) {
            return true;
          } else {
            return item.data > start && item.data < end;
          }
        }));
      });
    });
  }

}
