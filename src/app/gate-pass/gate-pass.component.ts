import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-gate-pass',
  templateUrl: './gate-pass.component.html',
  styleUrls: ['./gate-pass.component.css']
})
export class GatePassComponent implements OnInit {
  gatePass : any;
  html_Img: any;
  visitorData : any;
  constructor(public sharedService: SharedServiceService, public router: Router) { }

  ngOnInit(): void {
    if(!this.sharedService.get('userId')){
      this.router.navigate(['']);
      console.log(this.sharedService.get('userId'))
    }else{
      console.log('You are here')
      this.visitorData = this.sharedService.get('data');
      this.visitorData = JSON.parse(this.visitorData);
      this.gatePass = document.getElementById('img')!;
      console.log(this.visitorData)
    }

    this.gatePass = document.getElementById('img')!;


  }

  htmlPng(){
    htmlToImage.toJpeg(this.gatePass)
  .then(function (dataUrl) {
    var link = document.createElement('a');
    link.download = 'U-SMART-Gate Pass.jpeg';
    link.href = dataUrl;
    link.click();
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
  }

}
