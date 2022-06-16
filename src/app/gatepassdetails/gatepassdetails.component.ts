import { Component, OnInit } from '@angular/core';
import * as htmlToImage from 'html-to-image';






@Component({
  selector: 'app-gatepassdetails',
  templateUrl: './gatepassdetails.component.html',
  styleUrls: ['./gatepassdetails.component.css']
})
export class GatepassdetailsComponent implements OnInit {

  gatePass : any;

  constructor() { }

  ngOnInit(): void {

    this.gatePass = document.getElementById('gatePass')!;


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

}
