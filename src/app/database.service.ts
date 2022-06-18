import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Data, Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { SharedServiceService } from './shared-service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: AngularFirestore;
  private dataCollection: AngularFirestoreCollection<any>;
  userEmail: any;
  userId: any;
  urlImg: any;
  visitorsData: any;
  Date: any;
  date: any;
  time = ''; 
  errorData: any;

  constructor(db: AngularFirestore,private afAuth: AngularFireAuth,private router:Router, public sharedService: SharedServiceService, public fireStorage: AngularFireStorage) { 
    this.db = db;
    this.dataCollection = db.collection<any>('users');
  }

  // async addData(userName:string,password:string) {
  //   const totalUsersSnapshot = firstValueFrom(await this.db
  //     .collection<any>('users')
  //     .doc('totalUsers')
  //     .get());
  //   const totalUsers = (await totalUsersSnapshot).data().userId;
  //   const dataSend = {
  //     userEmail: userName,
  //     userId: 111111 + totalUsers + 1,
  //     userPassword: password,
  //   };
  //   const newUser = this.db
  //     .collection<any>('users')
  //     .doc((111111 + totalUsers + 1).toString())
  //     .set(dataSend);
  //   const snapshot = this.db
  //     .collection<any>('users')
  //     .doc('totalUsers')
  //     .set({ userId: totalUsers + 1 });
  //     this.afAuth.createUserWithEmailAndPassword(userName, password)
  //     .then((result) => {
  //       /* Call the SendVerificaitonMail() function when new user sign up and returns promise */
  //       // this.SendVerificationMail();
  //       // this.SetUserData(result.user);
  //     }).catch((error) => {
  //       console.log(error);
  //     });
  // }

  async loginUser(userId:string,password:string){
    this.userEmail = await this.getuserEmail(userId);
    // console.log(this.userEmail,password)
    this.afAuth.signInWithEmailAndPassword(this.userEmail, password)
    .then(loginResponse => {
          console.log(loginResponse);
          this.sharedService.set('userId',userId);
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
    //console.log(userEmail)
    return userEmail;
  }

  async getuserData(userId: any){
    const userSnapshot = firstValueFrom(await this.db
      .collection<any>('users')
      .doc(userId)
      .get());
    const userData = (await userSnapshot).data();
    this.sharedService.set('userData',JSON.stringify(userData))
    return userData;
  }

  async addVisitor(Form: any, additional: any) {
    //await this.addCsvFun(filePath, "/" + Form.value.compName + "_" + filePath.name)
    const totalUsersSnapshot = firstValueFrom(await this.db
      .collection<any>('visitors')
      .doc('totalVisitors')
      .get());
    const totalUsers = (await totalUsersSnapshot).data().visitorId;
    const visitorData = {
      vName: Form.value.vName,
      vMobile: Form.value.vMobile,
      vPov: Form.value.vPov,
      empName: Form.value.empName,
      vId: Form.value.vId,
      vIdno: Form.value.vIdno,
      vCaddr: Form.value.vCaddr,
      totalVis: Form.value.totalVis,
      vTab: Form.value.vTab,
      vLap: Form.value.vLap,
      vPen: Form.value.vPen,
      vOther: Form.value.vOther,
      vImg: this.sharedService.get('urlImg')?.toString(),
      addVisitor: [],
      checkinTime: firebase.firestore.FieldValue.serverTimestamp(),
      checkoutTime:'',
      vDate: ''
    };
    const newUser = await this.db
      .collection<any>('visitors')
      .doc((111111 + totalUsers + 1).toString())
      .set(visitorData);
    const checkInSnapshot = firstValueFrom(await this.db
      .collection<any>('visitors')
      .doc((111111 + totalUsers + 1).toString())
      .get());
    const checkIn = (await checkInSnapshot).data().checkinTime;
    this.date = checkIn.toDate().toString()
    const Time = this.date.split(' ')
    for(let i =1;i<4;i++){
      this.time = this.time + Time[i] + " "
    }
    console.log(this.time)
    await this.db
        .collection<any>('visitors')
        .doc((111111 + totalUsers + 1).toString())
        .update({
          vDate: this.time,
          checkinTime: Time[4],
        }); 
    const snapshot = this.db
      .collection<any>('visitors')
      .doc('totalVisitors')
      .set({ visitorId: totalUsers + 1 });
    this.userId = this.sharedService.get('userId')
    this.db
      .collection<any>('users')
      .doc(this.userId.toString())
      .update({
        visitors: firebase.firestore.FieldValue.arrayUnion((111111 + totalUsers + 1).toString()),
      }); 
    for(let m=0;m<additional.length;m++)
    {
        this.db
        .collection<any>('visitors')
        .doc((111111 + totalUsers + 1).toString())
        .update({
          addVisitor: firebase.firestore.FieldValue.arrayUnion(additional[m]),
        }); 
    }
  }


  async addImgFun(orgPath: any, filePath: any) {
    this.urlImg = await (
      await this.fireStorage.upload(
          filePath,
        orgPath
      )
    ).ref.getDownloadURL();
    this.sharedService.set('urlImg',this.urlImg)
    console.log(this.urlImg)
  }

  async getvisitors(userId: any, flag: any){
    const userSnapshot = firstValueFrom(await this.db
      .collection<any>('users')
      .doc(userId)
      .get());
    const visitors = (await userSnapshot).data().visitors;
    this.visitorsData = []
    for(let m=0;m<visitors.length;m++){
      this.errorData = await this.getvisitorData(visitors[m])
      console.log(this.errorData)
      if(this.errorData.checkoutTime  == "" || flag){
        this.visitorsData.push(this.errorData)
      }
    }
    return this.visitorsData
  }

  async getvisitorData(visitorId: string){
    //(ref) => ref.where('checkoutTime', '==', ""))
    const userSnapshot = firstValueFrom(await this.db
      .collection<any>('visitors')
      .doc(visitorId)
      .get());
    const visitorData = (await userSnapshot).data();
    return visitorData
  }

  async checkoutVisitor(index: any,userId: any){
    const userSnapshot = firstValueFrom(await this.db
      .collection<any>('users')
      .doc(userId)
      .get());
    const visitors = (await userSnapshot).data().visitors;
    await this.db
        .collection<any>('visitors')
        .doc(visitors[index])
        .update({
          checkoutTime: firebase.firestore.FieldValue.serverTimestamp()
        });
    const checkOutSnapshot = firstValueFrom(await this.db
          .collection<any>('visitors')
          .doc(visitors[index])
          .get());
    const checkOut = (await checkOutSnapshot).data().checkoutTime;
    this.date = checkOut.toDate().toString()
    const Time = this.date.split(' ')
    await this.db
        .collection<any>('visitors')
        .doc(visitors[index])
        .update({
          checkoutTime: Time[4]
        });
  }
}
