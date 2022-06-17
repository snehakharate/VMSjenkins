import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-gate-pass',
  templateUrl: './gate-pass.component.html',
  styleUrls: ['./gate-pass.component.css']
})
export class GatePassComponent implements OnInit {
  html_Img: any;

  constructor(public sharedService: SharedServiceService, public router: Router) { }

  ngOnInit(): void {
    if(!this.sharedService.get('userId')){
      this.router.navigate(['']);
      console.log(this.sharedService.get('userId'))
    }
  }

}
