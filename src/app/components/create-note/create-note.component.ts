import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { noteInterface } from 'src/app/interfaces/note-form-interface';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit, OnChanges {

  private colletionNote: AngularFirestoreCollection<noteInterface>;
  @Input() id: string = '';

  public noteForm:any;

  constructor( private fb: FormBuilder, private db: AngularFirestore, private _noteService: NotesService) { 
    this.colletionNote = db.collection<noteInterface>('notes');
    this.createForm();
  }

  ngOnInit() {
    
  }

  ngOnChanges() {
    console.log(this.id);
    
    if(this.id !== ''){
      this.editNote();
    }else{
      this.createForm();
    
    }
  }

  createForm(){
    this.noteForm = this.fb.group({
      id:[this.db.createId()],
      title: ['', [ Validators.required]],
      content: ['', [Validators.required]],
      archived: [false, [Validators.required]],
      date: [new Date().getTime() / 1000, [Validators.required]]
    });
  }

  editNote(){
    this.colletionNote.doc(this.id).valueChanges().subscribe((data) => {
      console.log(data);
      this.noteForm.setValue({
        ...data
      })
    })
  }

  createNote(){
    let note: noteInterface = this.noteForm.value;

    console.log(note);
    

    this.colletionNote.doc(note.id).set(note).then(res => {
      console.log('bien', res);
    }).catch(err => console.log('mal', err));
  }

}
