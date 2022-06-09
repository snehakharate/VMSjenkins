import { Component, OnInit } from '@angular/core';
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { WindowService } from '../window.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { environment } from 'src/environments/environment';
import { FirebaseApp, firebaseApp$ } from '@angular/fire/app';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {
 
  windowRef: any
  recaptchaVerifier: any;
  auth = getAuth()
  num = '+91 9172310389'
  testVerificationCode = '324068'
  constructor(private win: WindowService, private afAuth: AngularFireAuth, private router: Router) {
  }

  ngOnInit(): void {
    this.windowRef = this.win.windowRef;
  }
  ngAfterViewInit() {
    let captchaElement = document.getElementById('recaptcha-container');
    if (captchaElement != null) 
    {
      this.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{size: 'invisible'},this.auth);
      this.windowRef.recaptchaVerifier = this.recaptchaVerifier;
      this.windowRef.recaptchaVerifier.render();
      this.afAuth.signInWithPhoneNumber(this.num,this.recaptchaVerifier)
        .then((confirmationResult) => {
          // confirmationResult can resolve with the fictional testVerificationCode above.
          return confirmationResult.confirm(this.testVerificationCode)
        }).catch(function (error) {
          console.log(error);
        });
    }
  }
  
}
