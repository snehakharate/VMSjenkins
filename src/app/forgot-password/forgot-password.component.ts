import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, public db : DatabaseService) { }
  email: any;
  resetForm = new FormGroup({
    userId: new FormControl('', Validators.compose([Validators.required,Validators.minLength(6)])),
  });

  ngOnInit(): void {
  }

  async resetPasswordInit() { 
    this.email = await this.db.getuserEmail(this.resetForm.value.userId);
    // console.log(this.email)
    return this.afAuth.sendPasswordResetEmail(
      this.email, 
      { url: 'http://localhost:4200' }); 
    }

}
