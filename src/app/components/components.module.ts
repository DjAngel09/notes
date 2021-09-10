import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CreateNoteComponent } from './create-note/create-note.component';



@NgModule({
  declarations: [
    CreateNoteComponent
  ],
  exports: [
    CreateNoteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
