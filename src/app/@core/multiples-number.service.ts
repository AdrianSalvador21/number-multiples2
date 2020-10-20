import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MultiplesNumberService {
  private mnCollection: AngularFirestoreCollection<any>;
  private multipleNumbers: Observable<any[]>;

  constructor(public db: AngularFirestore) {
    this.mnCollection = this.db.collection<any>('multipleNumbers');
  }

  getMNRecords(uid: any) {
    /* this.mnCollection = this.db.collection<any>('todos', ref => ref.where('uid', '==', this.uid));
    this.todos = this.mnCollection.snapshotChanges().pipe(
      map(
        actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        }
      ));
    return this.todos;

     */

    this.mnCollection = this.db.collection<any>('multipleNumbers', (ref) => ref.where('uid', '==', uid));
    this.multipleNumbers = this.mnCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.multipleNumbers;
  }

  addMNRegister(mnRegister: any) {
    return this.mnCollection.add(mnRegister);
  }
}
