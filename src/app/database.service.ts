import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Data, Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { SharedServiceService } from './shared-service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DailyVisitorComponent } from './daily-visitor/daily-visitor.component';

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
  visitordata: any;
  gatepass: any;

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
          // console.log(loginResponse);
          this.sharedService.set('userId',userId);
          // alert("Login Successful!!")
          this.router.navigate(['home']);
    })
        .catch(error => {
          // console.log(error);
          alert("Incorrect Password!")
    });
  }

  async getuserEmail(userId: string){
    const totalUsersSnapshot = firstValueFrom(await this.db
      .collection<any>('users')
      .doc('totalUsers')
      .get());
    const totalUsers = (await totalUsersSnapshot).data().userId;
    // console.log(totalUsers)
    if(Number(userId) < (Number(totalUsers) + 111112)){
      const userSnapshot = firstValueFrom(await this.db
        .collection<any>('users')
        .doc(userId)
        .get());
        if(!(await userSnapshot).data()){
          // console.log("error")
        }
      const userEmail = (await userSnapshot).data().userEmail;
      //console.log(userEmail)
      return userEmail;
    }
    else{
      // console.log("this is error done")
       alert("Incorrect Security Code!")
      return "error"
    }
    
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
    this.userId = this.sharedService.get('userId')
    const totalCheckinsSnapshot = firstValueFrom(await this.db
      .collection<any>('users')
      .doc(this.userId.toString())
      .get());
    const totalCheckins = (await totalCheckinsSnapshot).data().checkIns;
    const dailyVisitors = (await totalCheckinsSnapshot).data().DailyVisitors;
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
      vCompname: Form.value.vCompname,
      vImg: this.sharedService.get('urlImg')?.toString(),
      addVisitor: [],
      checkinTime: firebase.firestore.FieldValue.serverTimestamp(),
      checkoutTime:'',
      vDate: '',
      visitorId: (111111 + totalUsers + 1).toString()
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
    // console.log(this.time)
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
    
    this.db
      .collection<any>('users')
      .doc(this.userId.toString())
      .update({
        visitors: firebase.firestore.FieldValue.arrayUnion((111111 + totalUsers + 1).toString()),
        checkIns: totalCheckins + 1,
        DailyVisitors: dailyVisitors + 1
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
    const visitorSnapshot = firstValueFrom(await this.db
      .collection<any>('visitors')
      .doc((111111 + totalUsers + 1).toString())
      .get());
    this.visitordata = JSON.stringify((await visitorSnapshot).data())
    this.sharedService.set("data",this.visitordata)
    await this.getcheckInOuts()
  }


  async addImgFun(orgPath: any, filePath: any) {
    const totalUsersSnapshot = firstValueFrom(await this.db
      .collection<any>('visitors')
      .doc('totalVisitors')
      .get());
    const totalUsers = (await totalUsersSnapshot).data().visitorId;
    this.urlImg = await (
      await this.fireStorage.upload(
        (111111 + totalUsers + 1).toString()+ filePath,
        orgPath
      )
    ).ref.getDownloadURL();
    this.sharedService.set('urlImg',this.urlImg)
    // console.log(this.urlImg)
  }

  async addGatepass(orgPath: any, filePath: any){
    this.gatepass = await (
      await this.fireStorage.upload(
        filePath,
        orgPath
      )
    ).ref.getDownloadURL();
    return this.gatepass
  }

  async getvisitors(userId: any, flag: any){
    const today: any = new Date();
    const Time = today.toString().split(' ')
    let timex = ""
    for(let i =1;i<4;i++){
      timex = timex + Time[i] + " "
    }
    console.log(today.toDateString())
    const userSnapshot = firstValueFrom(await this.db
      .collection<any>('users')
      .doc(userId)
      .get());
    const visitors = (await userSnapshot).data().visitors;
    this.visitorsData = []
    for(let m=0;m<visitors.length;m++){
      this.errorData = await this.getvisitorData(visitors[m])
      console.log(this.errorData)
      if((this.errorData.checkoutTime  == "" && this.errorData.vDate == timex) && !flag){
        this.visitorsData.push(this.errorData)
      }
      else if((!(this.errorData.checkoutTime  == "" ) && this.errorData.vDate == timex) && flag){
        this.visitorsData.push(this.errorData)
      }
    }
    if(flag){
      const sortedArray: [] = this.visitorsData.sort((obj1: any, obj2: any) => {
        if (obj1.checkoutTime > obj2.checkoutTime) {
          return -1;
        } else if (obj1.checkoutTime < obj2.checkoutTime) {
          return 1;
        }
        return 0;
      });
    }
    else{
      const sortedArray: [] = this.visitorsData.sort((obj1: any, obj2: any) => {
        if (obj1.checkinTime > obj2.checkinTime) {
          return -1;
        } else if (obj1.checkinTime < obj2.checkinTime) {
          return 1;
        }
        return 0;
      });
    }
    return this.visitorsData
  }

  async dailyVisitors(userId: any, flag: any){
    const today: any = new Date();
    const Time = today.toString().split(' ')
    let timex = ""
    for(let i =1;i<4;i++){
      timex = timex + Time[i] + " "
    }
    const userSnapshot = firstValueFrom(await this.db
      .collection<any>('users')
      .doc(userId)
      .get());
    const visitors = (await userSnapshot).data().visitors;
    this.visitorsData = []
    for(let m=0;m<visitors.length;m++){
        this.errorData = await this.getvisitorData(visitors[m])
        if(this.errorData.vDate == timex || flag){
          this.visitorsData.push(this.errorData)
        }
    }
    const sortedArray: [] = this.visitorsData.sort((obj1: any, obj2: any) => {
      if (obj1.checkoutTime > obj2.checkoutTime) {
        return -1;
      } else if (obj1.checkoutTime < obj2.checkoutTime) {
        return 1;
      }
      return 0;
    });
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

  async checkoutVisitor(visitorId: any){
    await this.db
        .collection<any>('visitors')
        .doc(visitorId)
        .update({
          checkoutTime: firebase.firestore.FieldValue.serverTimestamp()
        });
    const checkOutSnapshot = firstValueFrom(await this.db
          .collection<any>('visitors')
          .doc(visitorId)
          .get());
    const checkOut = (await checkOutSnapshot).data().checkoutTime;
    this.date = checkOut.toDate().toString()
    const Time = this.date.split(' ')
    await this.db
        .collection<any>('visitors')
        .doc(visitorId)
        .update({
          checkoutTime: Time[4]
        });
    this.userId = this.sharedService.get('userId')
    const totalCheckoutsSnapshot = firstValueFrom(await this.db
          .collection<any>('users')
          .doc(this.userId.toString())
          .get());
    const totalCheckouts = (await totalCheckoutsSnapshot).data().checkOuts;
    const totalCheckins = (await totalCheckoutsSnapshot).data().checkIns;
    await this.db
        .collection<any>('users')
        .doc(this.userId.toString())
        .update({
          checkOuts: totalCheckouts + 1,
          checkIns: totalCheckins -1
        });
    await this.getcheckInOuts()
  }

  async getcheckInOuts(){
    this.userId = this.sharedService.get('userId')
    const totalCheckoutsSnapshot = firstValueFrom(await this.db
          .collection<any>('users')
          .doc(this.userId.toString())
          .get());
    const totalCheckouts = (await totalCheckoutsSnapshot).data().checkOuts;
    const totalCheckins = (await totalCheckoutsSnapshot).data().checkIns;
    const dailyVisitors = (await totalCheckoutsSnapshot).data().DailyVisitors;
    this.sharedService.set("checkOuts",totalCheckouts.toString())
    this.sharedService.set("checkIns",totalCheckins.toString())
    this.sharedService.set("dailyVisitors",dailyVisitors.toString())
  }
}
