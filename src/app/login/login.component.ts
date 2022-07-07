import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { DatabaseService } from '../database.service';
import { SharedServiceService } from '../shared-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new UntypedFormGroup({
    userId: new UntypedFormControl('', Validators.compose([Validators.required,Validators.minLength(6)])),
    password: new UntypedFormControl('', Validators.compose([Validators.required]))
  });

  constructor(private afAuth: AngularFireAuth, private router: Router,private db : DatabaseService, public sharedService: SharedServiceService ,private ngxService: NgxUiLoaderService ) { }

  ngOnInit() {

  }

  doLogin(formData: UntypedFormGroup) {
    if (formData.valid) {
      // console.log(this.loginForm.value.userId)
      this.ngxService.start()
      this.db.loginUser(formData.value.userId,formData.value.password);
      this.sharedService.set("isQR","false")
      this.ngxService.stop()
    }
  }

  popUp(){
    this.router.navigate(['../forgotPass']);
  }

}
