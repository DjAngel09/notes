import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private authFire: AngularFireAuth, private router: Router) {}

  login(data:any){
    this.authFire.signInWithEmailAndPassword(data.email, data.password)
    .then((value) => { 
      this.router.navigateByUrl('/');
    })
    .catch(err => {
      console.log('error', err.message);
    });

  }

  loginGoogle(){
    this.authFire.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res =>{
      this.router.navigateByUrl('/');
    });
  }

  logout(){
    this.authFire.signOut().then(()=>{
      this.router.navigateByUrl('/login');
    })
  }
  
}
