import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { noteInterface } from '../../interfaces/note-form-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public notes: Observable<any>;
  public idNoteEdit:string = '';

  constructor(private firestore: AngularFirestore) { 
    this.notes = this.firestore.collection('notes').valueChanges();
  }

  ngOnInit() {
    
  }

  removeNote(id:string){

    this.firestore.collection('notes').doc(id).delete();

  }

  editNote(id:string){
    this.idNoteEdit = id;
  }

}
