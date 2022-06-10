import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { DatabaseService } from '../database.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.compose([Validators.required])),
    password: new FormControl('', Validators.compose([Validators.required]))
  });

  constructor(private afAuth: AngularFireAuth, private router: Router,private db : DatabaseService) { }

  ngOnInit() {
  }

  doLogin(formData: FormGroup) {
    if (formData.valid) {
        this.db.loginUser(formData.value.userName,formData.value.password);
    }
  }
}