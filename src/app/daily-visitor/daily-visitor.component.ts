import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-daily-visitor',
  templateUrl: './daily-visitor.component.html',
  styleUrls: ['./daily-visitor.component.css']
})
export class DailyVisitorComponent implements OnInit {

  constructor(private route: ActivatedRoute,public sharedService: SharedServiceService, public db: DatabaseService,public router: Router) { }
  pageshift = false
  visitorData:any;
  checkIns : any;
  checkOuts : any;
  dailyVisitors : any;

  ngOnInit(): void {
    this.db.getcheckInOuts()
    this.checkIns = this.sharedService.get("checkIns")
    this.checkOuts = this.sharedService.get("checkOuts")
    this.dailyVisitors = this.sharedService.get("dailyVisitors")
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

  async getData(userId: any){
    this.visitorData = await this.db.getvisitors(userId,1)
    console.log(this.visitorData)
  }

  nextPage(index: any){
    this.sharedService.set("pageshift","true")
    this.sharedService.set('data',JSON.stringify(this.visitorData[index]))
    this.router.navigate(['gpdetails'], {relativeTo:this.route});
    this.ngOnInit()
  }

}
