import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { SharedServiceService } from '../shared-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-vverify',
  templateUrl: './vverify.component.html',
  styleUrls: ['./vverify.component.css']
})
export class VverifyComponent implements OnInit {

  display = 'none';
  private otp = '';
  dataNew: any;
  data:any;
  status = '';
  verifyForm = new FormGroup({
    mob: new FormControl('', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])),
    otp: new FormControl('', Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(6)]))
  });
  constructor(public router: Router, private http: HttpClient, public sharedService: SharedServiceService, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    if(!this.sharedService.get('userId')){
      this.router.navigate(['']);
      console.log(this.sharedService.get('userId'))
  }
  }

  sendOTP(){
    const url = 'https://r0mgkjqdsb.execute-api.ap-south-1.amazonaws.com/testotp/sendotp?api='+environment.apiKey+'&mobile='+this.verifyForm.value.mob
    console.log(url)
    this.ngxService.start()
    this.http.get(url).subscribe((res)=>{
     this.data = res
     this.status = this.data.status.toString()
     this.otp = this.data.message.content.toString().split(' ')[4].toString()
     if(this.status == 'success'){
      this.display = 'block'
      alert("OTP Sent Successfully!")
      this.ngxService.stop()
     }
   })
  }

  async goForm(){
     if(this.status == 'success' && this.otp == this.verifyForm.value.otp){
      this.ngxService.start()
      this.sharedService.set('mobile',this.verifyForm.value.mob)
      alert("Verfication Successfull!")
      this.ngxService.stop()
      this.router.navigate(['form']);

     }
     else{
      alert("Incorrect OTP!!")
     }
  }

}
