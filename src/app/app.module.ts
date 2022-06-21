import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage/';
import { environment } from 'src/environments/environment';
import { FirebaseApp, FirebaseAppModule } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { VverifyComponent } from './vverify/vverify.component';
import { FormComponent } from './form/form.component';
import { WebcamModule } from 'ngx-webcam';
import { LogoComponent } from './logo/logo.component';
import {HttpClientModule} from '@angular/common/http';
import { GatepassdetailsComponent } from './gatepassdetails/gatepassdetails.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckinComponent } from './checkin/checkin.component';
import { DailyVisitorComponent } from './daily-visitor/daily-visitor.component';
import { PreAppointmentComponent } from './pre-appointment/pre-appointment.component';
import { GatePassComponent } from './gate-pass/gate-pass.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    HomeComponent,
    VverifyComponent,
    FormComponent,
    LogoComponent,
    GatepassdetailsComponent,
    CheckoutComponent,
    CheckinComponent,
    DailyVisitorComponent,
    PreAppointmentComponent,
    GatePassComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    WebcamModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
