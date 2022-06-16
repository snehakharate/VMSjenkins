import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { SharedServiceService } from '../shared-service.service';
@Component({
  selector: 'app-vverify',
  templateUrl: './vverify.component.html',
  styleUrls: ['./vverify.component.css']
})
export class VverifyComponent implements OnInit {

  dataNew: any;
  data:any;
  authyID = '';
  verified = 0;
  verifyForm = new FormGroup({
    mob: new FormControl('', Validators.compose([Validators.required])),
    otp: new FormControl('', Validators.compose([Validators.required]))
  });
  constructor(public router: Router, private http: HttpClient, public sharedService: SharedServiceService) { }

  ngOnInit(): void {
  }

  sendOTP(){
    const url ='https://usmartotp.herokuapp.com/?mobile='+this.verifyForm.value.mob+'&token='+ environment.apiKey
    console.log(url)
    this.http.get(url).subscribe((res)=>{
     this.data = res
     this.authyID = this.data.output.toString()
     console.log(this.authyID)
   })
  }

  async goForm(){
    const url ='https://verifyusmart.herokuapp.com/?authyid='+this.authyID+'&otp='+this.verifyForm.value.otp+'&token='+ environment.apiKey
    console.log(url)
    await this.http.get(url).subscribe((res)=>{
     this.dataNew = res
     this.verified = Number(this.dataNew.output.toString())
     if(this.verified){
      this.sharedService.set('mobile',this.verifyForm.value.mob)
      this.router.navigate(['form']);
     } 
     console.log(this.verified)
    })
  }

}
