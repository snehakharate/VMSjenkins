import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
// import { GatepassdetailsComponent } from '../gatepassdetails/gatepassdetails.component';

@Component({
  selector: 'app-gate-pass',
  templateUrl: './gate-pass.component.html',
  styleUrls: ['./gate-pass.component.css']
})
export class GatePassComponent implements OnInit {
  html_Img: any;

  constructor(public sharedService: SharedServiceService) {
    // this.html_Img = htmlImg
   }

  ngOnInit(): void {
  }

}
