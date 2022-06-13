import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  stream: any = null;
  status: any = null;
  trigger: Subject<void>=new Subject();
  previewImage: string = '';
  newImage:string = '';
  btnLabel: string = 'Capture image';

  constructor(public sharedService: SharedServiceService) { 
  }

  ngOnInit(): void {
    console.log(this.sharedService.userId)
  }

  get $trigger(): Observable<void>{
    return this.trigger.asObservable();
  }

  snapshot(event: WebcamImage){
    console.log(event);
    this.previewImage = event.imageAsDataUrl;
    this.captureImage()
    this.btnLabel = 'Re capture image'
  }

  CheckPermissions() {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 500,
        height: 500
      }
    }).then((res) => {
      console.log("response", res);
      this.stream = res;
      this.status = 'My camera is accessing';
      this.btnLabel = 'Capture image';
    }).catch(err => {
      console.log(err);
      if(err?.message === 'Permission denied') {
        this.status = 'Permission denied please try again by approving the access';
      } else {
        this.status = 'You may not having camera system, Please try again ...';
      }
    })
  }

  captureImage() {
    this.newImage = this.previewImage;
    this.trigger.next();
  }

  proceed() {
    console.log(this.newImage);
  }

}
