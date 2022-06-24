import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatabaseService } from '../database.service';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-daily-visitor',
  templateUrl: './daily-visitor.component.html',
  styleUrls: ['./daily-visitor.component.css']
})
export class DailyVisitorComponent implements OnInit {

  constructor(private route: ActivatedRoute,public sharedService: SharedServiceService, public db: DatabaseService,public router: Router, private ngxService: NgxUiLoaderService) { }
  pageshift = false
  visitorData:any;
  checkIns : any;
  checkOuts : any;
  dailyVisitors : any;
  searchkey ="";
  preData:any;

  async ngOnInit() {
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

  async getData(userId: any){
    this.ngxService.start()
    this.preData = await this.db.getvisitors(userId,1)
    this.visitorData = this.preData
    console.log(this.visitorData)
    this.ngxService.stop()
  }

  nextPage(index: any){
    this.sharedService.set("pageshift","true")
    this.sharedService.set('data',JSON.stringify(this.visitorData[index]))
    this.router.navigate(['gpdetails'], {relativeTo:this.route});
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
