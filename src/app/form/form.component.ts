import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { SharedServiceService } from '../shared-service.service';
import { firstValueFrom } from 'rxjs';
import { DatabaseService } from '../database.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  visitorDetails = new FormGroup(
    {
      vName: new FormControl('',Validators.compose([Validators.required])),
      vMobile: new FormControl('',Validators.compose([Validators.required])),
      vPov: new FormControl('',Validators.compose([Validators.required])),
      empName: new FormControl('',Validators.compose([Validators.required])),
      vId: new FormControl('',Validators.compose([Validators.required])),
      vIdno: new FormControl('',Validators.compose([Validators.required])),
      vCaddr: new FormControl('',Validators.compose([Validators.required])),
      totalVis: new FormControl('',Validators.compose([Validators.required])),
      vTab: new FormControl(),
      vLap: new FormControl(),
      vPen: new FormControl(),
      vOther: new FormControl(),
      vImg: new FormControl(),
      example: new FormControl('',Validators.compose([Validators.required]))
    }
  )
  visitorMob: any

  constructor(public sharedService: SharedServiceService, public db: DatabaseService){}

  stream: any = null;
  status: any = null;
  userData: any;
  employeesD: any;
  visitors: any;

  ngOnInit(): void {
    this.userData = this.sharedService.get('userData')
    this.userData = JSON.parse(this.userData)
    this.employeesD = this.userData.empDetails
    console.log(this.employeesD)
    this.visitorMob = (this.sharedService.get('mobile'))?.toString()
    this.visitorDetails.value.totalVis = 0
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



  public handleImage(webcamImage: WebcamImage): void {
      this.webcamImage = webcamImage;
      this.captureImage = webcamImage!.imageAsDataUrl;
      console.info('received webcam image', this.captureImage);
      const file = new File([this.sharedService.convertDataUrlToBlob(this.captureImage)],'img_1.jpg', {type: `image/*.jpg`});
      console.log(file)
      this.db.addImgFun(file,this.visitorMob + '_img.jpg')
  }


  public get triggerObservable(): Observable<any> {
      return this.trigger.asObservable();
  }


  public get nextWebcamObservable(): Observable<any> {
      return this.nextWebcam.asObservable();
  }

  createArray(){
    this.visitors = []
    for(let i = 0; i< this.visitorDetails.value.totalVis; i++){
      this.visitors.push(i.toString());
    }
  }

  addVisitorName(index: any){
    this.visitors[index] = this.visitorDetails.value.example
    console.log(this.visitors)
  }

  submitData(){
    if(this.visitorDetails.valid){
      this.db.addVisitor(this.visitorDetails,this.visitors)
    }
    else{
      console.log('invalid data')
    }
  }



}


