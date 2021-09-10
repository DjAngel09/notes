import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private _auth: AuthService) { }

  ngOnInit(): void {
  }

  login(){    
    this._auth.login(this.loginForm.value);
  }

  loginGoogle(){
    this._auth.loginGoogle();
  }

}
