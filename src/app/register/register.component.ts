import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    userName: new FormControl('', Validators.compose([Validators.required])),
    password: new FormControl('', Validators.compose([Validators.required]))
  });

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: DatabaseService) { }

  ngOnInit(): void {
  }

  doRegister(formData: FormGroup) {
    if (formData.valid) {
      this.moveHere(formData.value.userName, formData.value.password);
    }
  }
  async moveHere(userName:string, password:string){
    this.db.addData(userName, password)
  }
}
