import { Component, OnInit , OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';
import * as htmlToImage from 'html-to-image';
import { DatabaseService } from '../database.service';
import { delay } from 'rxjs';
import { window } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-gate-pass',
  templateUrl: './gate-pass.component.html',
  styleUrls: ['./gate-pass.component.css']
})
export class GatePassComponent implements OnInit {
  gatePass : any;
  html_Img: any;
  visitorData : any;
  vgatePass:any;
  userData: any;
  empMob: any;
  constructor(public sharedService: SharedServiceService, public router: Router, public db: DatabaseService,public httpClient: HttpClient) { }
  Image: any;
  clicked = false
  async ngOnInit() {
    if(!this.sharedService.get('userId')){
      this.router.navigate(['']);
      // console.log(this.sharedService.get('userId'))
    }else{
      this.Image = this.sharedService.get("urlImg")
      this.visitorData = this.sharedService.get('data');
      this.visitorData = JSON.parse(this.visitorData);
      this.gatePass = document.getElementById('img')!;
      if(this.sharedService.get("isQR") == "true"){
        this.sharedService.set("userId","")
      }
      // console.log(this.visitorData)
    }
  }

  async gatepassSend(){
    this.userData = this.sharedService.get('userData')
    this.userData = JSON.parse(this.userData)
    for(let i =0 ; i<this.userData.empDetails.length;i++){
      if(this.userData.empDetails[i].name.replace('\n','') == this.visitorData.empName){
        this.empMob = this.userData.empDetails[i].phone;
      }
    }
    console.log(this.empMob)
    await htmlToImage.toJpeg(this.gatePass).then(async (dataUrl) => { 
      const file = new File([this.sharedService.convertDataUrlToBlob(dataUrl)],'img_1.png', {type: `image/png`});
      this.vgatePass =  await this.db.addGatepass(file,this.visitorData.visitorId + '_gatepass.png')
      const url = 'https://usmartwp.herokuapp.com/approve?link='+this.vgatePass.toString()+'&vName='+this.visitorData.vName + '&eName='+ this.visitorData.empName + '&Pov=' + this.visitorData.vPov +'&vMob='+this.visitorData.vMobile+'&eMob=' + this.empMob + '&visitorId=' + this.visitorData.visitorId
      console.log(url)
      await this.httpClient.get(url).subscribe((res)=>{
        const response = res
      })
      const url2 = 'https://usmartwp.herokuapp.com/deny?&eName='+ this.visitorData.empName + '&eMob=' + this.empMob + '&visitorId=' + this.visitorData.visitorId
      await this.httpClient.get(url2).subscribe((res)=>{})
    })
  }

  htmlPng(){
    htmlToImage.toJpeg(this.gatePass)
  .then( (dataUrl) => {
    var link = document.createElement('a');
    link.download = 'U-SMART-Gate Pass.png';
    link.href = dataUrl;
    link.click();
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
  }

}
