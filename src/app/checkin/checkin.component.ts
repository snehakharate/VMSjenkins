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
  preData: any;
  checkIns : any;
  checkOuts : any;
  dailyVisitors : any;
  searchkey =""
  constructor(public route: ActivatedRoute, public db: DatabaseService, public sharedService: SharedServiceService, public router: Router, private ngxService: NgxUiLoaderService) {
    this.pageshift = false
  }

  pageshift = false
  async ngOnInit() {
    this.ngxService.start()
    this.db.getcheckInOuts()
    this.checkIns = this.sharedService.get("checkIns")
    this.checkOuts = this.sharedService.get("checkOuts")
    this.dailyVisitors = this.sharedService.get("dailyVisitors")
    console.log(this.pageshift)
    this.pageshift = false
    if(!this.sharedService.get('userId') || (this.sharedService.get("isQR") == "true")){
      this.router.navigate(['']);
      console.log(this.sharedService.get('userId'))
    }
    else{
      await this.db.getcheckInOuts()
      this.checkIns = this.sharedService.get("checkIns")
      this.checkOuts = this.sharedService.get("checkOuts")
      this.dailyVisitors = this.sharedService.get("dailyVisitors")
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
    this.preData = await this.db.getvisitors(userId,0)
    this.visitorData = this.preData
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

  searchThis(){
    this.visitorData = []
    for(let i =0; i< this.preData.length;i++){
      const len = this.searchkey.length
      if(this.preData[i].vMobile.substring(0,len) == this.searchkey){
        this.visitorData.push(this.preData[i])
      }
    }
  }

}
