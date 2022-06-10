import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';

import { environment } from 'src/environments/environment';
import { CheckinComponent } from './checkin/checkin.component';
import { FirebaseApp, FirebaseAppModule } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CheckinComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
