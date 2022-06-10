import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Data, Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: AngularFirestore;
  private dataCollection: AngularFirestoreCollection<any>;
  userEmail: any;

  constructor(db: AngularFirestore,private afAuth: AngularFireAuth,private router:Router) { 
    this.db = db;
    this.dataCollection = db.collection<any>('users');
  }

  async addData(userName:string,password:string) {
    const totalUsersSnapshot = firstValueFrom(await this.db
      .collection<any>('users')
      .doc('totalUsers')
      .get());
    const totalUsers = (await totalUsersSnapshot).data().userId;
    const dataSend = {
      userEmail: userName,
      userId: 111111 + totalUsers + 1,
      userPassword: password,
    };
    const newUser = this.db
      .collection<any>('users')
      .doc((111111 + totalUsers + 1).toString())
      .set(dataSend);
    const snapshot = this.db
      .collection<any>('users')
      .doc('totalUsers')
      .set({ userId: totalUsers + 1 });
      this.afAuth.createUserWithEmailAndPassword(userName, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign up and returns promise */
        // this.SendVerificationMail();
        // this.SetUserData(result.user);
      }).catch((error) => {
        console.log(error);
      });
  }

  async loginUser(userId:string,password:string){
    this.userEmail = await this.getuserEmail(userId);
    console.log(this.userEmail,password)
    this.afAuth.signInWithEmailAndPassword(this.userEmail, password)
    .then(loginResponse => {
          console.log(loginResponse);
          this.router.navigate(['home']);
    })
        .catch(error => {
          console.log(error);
    });
  }

  async getuserEmail(userId: string){
    const userSnapshot = firstValueFrom(await this.db
      .collection<any>('users')
      .doc(userId)
      .get());
    const userEmail = (await userSnapshot).data().userEmail;
    console.log(userEmail)
    return userEmail;
  }
}
