import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SharedServiceService } from '../shared-service.service';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  visitorData : any;
  searchedKeyword = '';
  filterResultDataSet: any;
  constructor(public db: DatabaseService, public sharedService: SharedServiceService) { }

  ngOnInit(): void {
      const userId = this.sharedService.get('userId')
      this.getData(userId)
  }

  async getData(userId: any){
    this.visitorData = await this.db.getvisitors(userId)
    console.log(this.visitorData)
    this.filterResultDataSet = this.visitorData;
  }

  

}
