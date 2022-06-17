import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SharedServiceService } from '../shared-service.service';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  visitorData : any;
  constructor(public route: ActivatedRoute, public db: DatabaseService, public sharedService: SharedServiceService, public router: Router) {
   }

  pageshift = false
  ngOnInit(): void {
    if(!this.sharedService.get('userId')){
      this.router.navigate(['']);
      console.log(this.sharedService.get('userId'))
    }
    else{
      this.pageshift =false
      const userId = this.sharedService.get('userId')
      this.getData(userId)
    }
  }

  async getData(userId: any){
    this.visitorData = await this.db.getvisitors(userId)
    console.log(this.visitorData)

  }

  nextPage(index: any){
    this.pageshift = true
    this.sharedService.set('data',JSON.stringify(this.visitorData[index]))
    this.router.navigate(['gpdetails'], {relativeTo:this.route});
    this.ngOnInit()
  }

}
