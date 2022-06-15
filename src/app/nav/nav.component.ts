import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public router: Router, public sharedService: SharedServiceService) { }

  ngOnInit(): void {
  }

  goHome(){
    this.router.navigate(['../home']);
  }

  logOut(){
    this.sharedService.erase();
    this.sharedService.set('userId','');
    this.router.navigate(['../'])
  }


}
