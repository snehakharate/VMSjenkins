import { Component, OnInit, OnChanges } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SharedServiceService } from '../shared-service.service';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { createPublicKey } from 'crypto';
import { window } from 'rxjs';


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  visitorData : any;
  checkIns : any;
  checkOuts : any;
  dailyVisitors : any;
  constructor(public route: ActivatedRoute, public db: DatabaseService, public sharedService: SharedServiceService, public router: Router, private ngxService: NgxUiLoaderService) {
    this.pageshift = false
  }

  pageshift = false
  ngOnInit(): void {
    this.ngxService.start()
    this.db.getcheckInOuts()
    this.checkIns = this.sharedService.get("checkIns")
    this.checkOuts = this.sharedService.get("checkOuts")
    this.dailyVisitors = this.sharedService.get("dailyVisitors")
    console.log(this.pageshift)
    this.pageshift = false
    if(!this.sharedService.get('userId')){
      this.router.navigate(['']);
      console.log(this.sharedService.get('userId'))
    }
    else{
      const userId = this.sharedService.get('userId')
      this.getData(userId)
    }
  }

  ngOnChanges(): void {
    this.pageshift = false
    this.checkIns = this.sharedService.get("checkIns")
    this.checkOuts = this.sharedService.get("checkOuts")
    this.dailyVisitors = this.sharedService.get("dailyVisitors")
    this.ngOnInit()
  }


  async getData(userId: any){
    this.visitorData = await this.db.getvisitors(userId,0)
    console.log(this.visitorData)
    this.ngxService.stop()


  }

  nextPage(index: any){
    this.sharedService.set("pageshift","true")
    this.sharedService.set('data',JSON.stringify(this.visitorData[index]))
    this.router.navigate(['gpdetails'], {relativeTo:this.route});
  }

  async checkOut(index: any){
    this.ngxService.start()
    await this.db.checkoutVisitor(index)
    console.log('success')
    this.ngxService.stop()
    this.ngOnInit()
  }


}
