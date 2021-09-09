import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { noteInterface } from '../interfaces/note-form-interface';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private colletionNote: AngularFirestoreCollection<noteInterface>;

  constructor(private db: AngularFirestore) { 

    this.colletionNote = db.collection<noteInterface>('notes');

  }

  createNote(note:noteInterface){

    this.colletionNote.doc(note.id).set(note).then(res => {
      console.log('bien', res);
    }).catch(err => console.log('mal', err));
  }

}
