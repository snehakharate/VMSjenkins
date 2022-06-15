import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup , Validators } from '@angular/forms';


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
      vTab: new FormControl('',Validators.compose([Validators.required])),
      vLap: new FormControl('',Validators.compose([Validators.required])),
      vPen: new FormControl('',Validators.compose([Validators.required])),
      vOther: new FormControl('',Validators.compose([Validators.required]))
    }
  )


  ngOnInit() {

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
      console.info('received webcam image', this.webcamImage);

  }


  public get triggerObservable(): Observable<any> {

      return this.trigger.asObservable();
  }


  public get nextWebcamObservable(): Observable<any> {

      return this.nextWebcam.asObservable();
  }



}


