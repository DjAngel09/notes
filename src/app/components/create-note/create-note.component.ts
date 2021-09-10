import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  @Input() uid: string | undefined = '';

  public noteForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private _noteService: NotesService
  ) {

    this.colletionNote = db.collection<noteInterface>('notes');
    this.createForm();

  }

  ngOnInit() {

  }

  notEmailValidator(title: string) {

    return (formGroup: FormGroup) => {

      const titleControl = formGroup.get(title);
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(titleControl?.value)) {
        titleControl?.setErrors(null)
      } else {
        titleControl?.setErrors({ isEmail: true });
      }

    }

  }

  ngOnChanges() {
    if (this.id !== '') {
      this.editNote();
    } else {
      this.createForm();

    }
  }

  createForm() {
    this.noteForm = this.fb.group({
      iduser: [this.uid],
      id: [this.db.createId()],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      archived: [false, [Validators.required]],
      date: [new Date().getTime() / 1000, [Validators.required]]
    }, {
      validators: this.notEmailValidator('title')
    });
  }

  editNote() {
    this.colletionNote.doc(this.id).valueChanges().subscribe((data) => {
      this.noteForm.setValue({
        ...data
      })
    })
  }

  createNote() {

    const note: noteInterface = this.noteForm.value;

    if (this.noteForm.valid) {

      this._noteService.createNote(note, (res: any) => {
        this.createForm();
        const modal: HTMLElement = document.getElementById('noteModal') as HTMLElement;
        modal.click();

      });
      
    }
  }

}
