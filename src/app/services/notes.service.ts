import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { noteInterface } from '../interfaces/note-form-interface';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private colletionNote: AngularFirestoreCollection<noteInterface>;
  private colletionNoteArchived: AngularFirestoreCollection<noteInterface>;

  constructor(private db: AngularFirestore) { 

    this.colletionNote = db.collection<noteInterface>('notes');
    this.colletionNoteArchived = db.collection<noteInterface>('archivednotes');

  }

  createNote(note:noteInterface, callback:any){

    this.colletionNote.doc(note.id).set(note).then(res => {
      callback(true)
    }).catch(err => callback(err));

  }

  archivedNote(note:noteInterface, callback: any){

    if(note.archived){

      this.colletionNote.doc(note.id).delete();
      this.colletionNoteArchived.doc(note.id).set(note).then(res => {
        callback(true)
      }).catch(err => callback(err));

    }else {

      this.colletionNoteArchived.doc(note.id).delete();
      this.colletionNote.doc(note.id).set(note).then(res => {
        callback(true)
      }).catch(err => callback(err));
      
    }

  }

}
