import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { UntypedFormControl, UntypedFormGroup , Validators } from '@angular/forms';
import { SharedServiceService } from '../shared-service.service';
import { firstValueFrom } from 'rxjs';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  visitorDetails = new UntypedFormGroup(
    {
      vName: new UntypedFormControl('',Validators.compose([Validators.required])),
      vMobile: new UntypedFormControl('',Validators.compose([Validators.required])),
      vPov: new UntypedFormControl('',Validators.compose([Validators.required])),
      empName: new UntypedFormControl('',Validators.compose([Validators.required])),
      vId: new UntypedFormControl('',Validators.compose([Validators.required])),
      vIdno: new UntypedFormControl('',Validators.compose([Validators.required])),
      vCaddr: new UntypedFormControl('',Validators.compose([Validators.required])),
      vCompname : new UntypedFormControl('',Validators.compose([Validators.required])),
      totalVis: new UntypedFormControl('',Validators.compose([Validators.required])),
      vTab: new UntypedFormControl(),
      vLap: new UntypedFormControl(),
      vPen: new UntypedFormControl(),
      vOther: new UntypedFormControl(),
      vImg: new UntypedFormControl(),
      example: new UntypedFormControl()
    }
  )
  visitorMob: any

  constructor(public sharedService: SharedServiceService, public db: DatabaseService, public router: Router, private ngxService: NgxUiLoaderService){}

  stream: any = null;
  status: any = null;
  userData: any;
  employeesD: any;
  visitors: any;
  display = 'none'

  ngOnInit(): void {
    if(!this.sharedService.get('userId')){
      this.router.navigate(['']);
      // console.log(this.sharedService.get('userId'))
    }
    else if(!this.sharedService.get("mobile")){
      this.router.navigate(['vverify'])
    }
    else{
      this.userData = this.sharedService.get('userData')
      this.userData = JSON.parse(this.userData)
      this.employeesD = this.userData.empDetails
      this.visitorMob = (this.sharedService.get('mobile'))?.toString()
      this.visitorDetails.value.totalVis = 0
      this.createArray()
    }
  }

  /*Incremental input for additional visitors*/
  num:number=1
  i=1;
  plus(){
    if(this.i !=10){
      this.i++;
      this.num=this.i
      this.visitorDetails.value.totalVis = this.num
      this.createArray()
    }
    
  }
  minus(){
    if(this.i !=1){
      this.i--;
      this.num=this.i
      this.visitorDetails.value.totalVis = this.num
      this.createArray()
    }
    
  }

  showWebcam = true;
  private trigger: Subject<any> = new Subject();

  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();

  captureImage  = '';



  public triggerSnapshot(): void {
      this.trigger.next('any');
      this.showWebcam = !this.showWebcam;
  }



  public async handleImage(webcamImage: WebcamImage) {
      this.webcamImage = webcamImage;
      this.captureImage = webcamImage!.imageAsDataUrl;
      console.info('received webcam image', this.captureImage);
      const file = new File([this.sharedService.convertDataUrlToBlob(this.captureImage)],'img_1.jpg', {type: `image/.jpg`});
      await this.db.addImgFun(file,this.visitorMob + '_img.jpg')
      this.display = 'block'
  }


  public get triggerObservable(): Observable<any> {
      return this.trigger.asObservable();
  }


  public get nextWebcamObservable(): Observable<any> {
      return this.nextWebcam.asObservable();
  }

  createArray(){
    this.visitors = []
    if(this.visitorDetails.value.totalVis>1){
      for(let i = 0; i< this.visitorDetails.value.totalVis-1; i++){
        this.visitors.push(i.toString());
      }
    }

  }

  addVisitorName(index: any){
    this.visitors[index] = this.visitorDetails.value.example
    // console.log(this.visitors)
  }

  async submitData(){
    if(this.visitorDetails.valid){
      this.ngxService.start()
      await this.db.addVisitor(this.visitorDetails,this.visitors)
      this.sharedService.set("mobile","")
      this.ngxService.stop()
      this.router.navigate(['gatepass']);
    }
    else{
      // console.log('invalid data')
      // console.log(this.visitorDetails.value.vName)
    }
  }



}


