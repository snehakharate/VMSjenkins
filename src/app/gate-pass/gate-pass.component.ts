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
  constructor(public sharedService: SharedServiceService, public router: Router, public db: DatabaseService,public httpClient: HttpClient) { }
  Image: any;
  clicked = false
  async ngOnInit() {
    if(!this.sharedService.get('userId')){
      this.router.navigate(['']);
      console.log(this.sharedService.get('userId'))
    }else{
      this.Image = this.sharedService.get("urlImg")
      this.visitorData = this.sharedService.get('data');
      this.visitorData = JSON.parse(this.visitorData);
      this.gatePass = document.getElementById('img')!;
      if(this.sharedService.get("isQR") == "true"){
        this.sharedService.set("userId","")
      }
      console.log(this.visitorData)
    }
  }

  async gatepassSend(){
    htmlToImage.toJpeg(this.gatePass).then(async (dataUrl) => { 
      const file = new File([this.sharedService.convertDataUrlToBlob(dataUrl)],'img_1.png', {type: `image/png`});
      this.vgatePass =  await this.db.addGatepass(file,this.visitorData.visitorId + '_gatepass.png')
      const url = 'https://r0mgkjqdsb.execute-api.ap-south-1.amazonaws.com/testotp/wpgatepass?api='+environment.wpAPI+'&mobile='+this.visitorData.vMobile+'&link='+this.vgatePass.toString()+'&name='+this.visitorData.vName
        console.log(url)
        this.httpClient.get(url).subscribe((res)=>{
        console.log(res)
      })
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
