import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { SharedServiceService } from '../shared-service.service';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userData: any;
  constructor(public sharedService: SharedServiceService, public router: Router, public db : DatabaseService) { }

  ngOnInit(): void {
    if(!this.sharedService.get('userId')){
        this.router.navigate(['']);
        console.log(this.sharedService.get('userId'))
    }
    const userId = this.sharedService.get('userId')
    this.userData = this.db.getuserData(userId);
    this.sharedService.set("pageshift","false")
    //this.sharedService.set('userData',json)
  }
}
