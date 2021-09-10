import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { noteInterface } from '../../interfaces/note-form-interface';
import { NotesService } from '../../services/notes.service';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public notes: Observable<any> = new Observable;
  public idNoteEdit = '';
  public archived = false;
  public uid:string | undefined = "";

  constructor(
    private firestore: AngularFirestore, 
    private _notesSerive: NotesService, 
    private route: Router,
    private authFire: AngularFireAuth
  ) {

    this.authFire.currentUser.then(user => {
      
      this.uid = user?.uid;
      if(this.route.url == '/archived'){
        this.archived = true
        this.notes = this.firestore.collection('archivednotes', ref => ref.where('iduser', '==', user?.uid)).valueChanges();
      }else{
        this.archived = false
        this.notes = this.firestore.collection('notes', ref => ref.where('iduser', '==', user?.uid)).valueChanges();
      }

    })
  }

  ngOnInit() {
    
  }

  removeNote(id:string){
    if(this.route.url == '/archived'){
      this.firestore.collection('archivednotes').doc(id).delete();
    }else{
      this.firestore.collection('notes').doc(id).delete();
    }
    
  }

  editNote(id:string){
    this.idNoteEdit = id;
  }

  archiveNote(note:noteInterface){
    note.archived = true ? !this.archived : false;
    this._notesSerive.archivedNote(note, (res:any) =>{
    })
  }

}
