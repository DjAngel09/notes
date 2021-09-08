import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  notes: Observable<any[]>;

  constructor(private firestore: AngularFirestore) { 
    this.notes = this.firestore.collection('notes').valueChanges();
  }

  ngOnInit() {
    
    
  }

}
