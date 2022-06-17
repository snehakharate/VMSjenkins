import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as htmlToImage from 'html-to-image';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-gatepassdetails',
  templateUrl: './gatepassdetails.component.html',
  styleUrls: ['./gatepassdetails.component.css']
})
export class GatepassdetailsComponent implements OnInit {

  gatePass : any;
  visitorData: any;
  constructor(public sharedService: SharedServiceService, public router: Router, private location: Location) { }

  ngOnInit(): void {
    if(!this.sharedService.get('userId')){
      this.router.navigate(['']);
      console.log(this.sharedService.get('userId'))
    }
    else{
      console.log('You are here')
      this.visitorData = this.sharedService.get('data');
      this.visitorData = JSON.parse(this.visitorData);

      this.gatePass = document.getElementById('gatePass')!;
      console.log(this.visitorData)
    }
  }

  htmlPng(){
    htmlToImage.toJpeg(this.gatePass)
  .then(function (dataUrl) {
    var link = document.createElement('a');
    link.download = 'my-image-name.jpeg';
    link.href = dataUrl;
    link.click();
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
  }

  navigate(){
    this.location.back()
  }

}
