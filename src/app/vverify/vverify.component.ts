import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { SharedServiceService } from '../shared-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatabaseService } from '../database.service';
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
  constructor(public db : DatabaseService, public router: Router, private http: HttpClient, public sharedService: SharedServiceService, private ngxService: NgxUiLoaderService, private route: ActivatedRoute) { }

  user = {id: String}
  userData: any;

  async ngOnInit() {
    if(this.route.snapshot.params['id']){
      this.sharedService.set("userId",this.route.snapshot.params['id'].toString())
      this.sharedService.set("isQR","true")
      await this.db.getuserData(this.sharedService.get("userId"))
      // console.log(this.route.snapshot.params['id'].toString())
    }
    else if(!this.sharedService.get('userId')){
      this.router.navigate(['']);
    }

  }

  sendOTP(){
    const url = 'https://cv12ew5wgj.execute-api.ap-south-1.amazonaws.com/testing/otp?api='+environment.apiKey+'&mobile='+this.verifyForm.value.mob
    // console.log(url)
    this.http.get(url).subscribe((res)=>{
     this.data = res
     this.status = this.data.status.toString()
     this.otp = this.data.message.content.toString().split(' ')[4].toString()
     const wpurl = 'https://r0mgkjqdsb.execute-api.ap-south-1.amazonaws.com/wptest/wpotp?api='+environment.wpAPI+'&mobile='+this.verifyForm.value.mob+'&otp='+this.otp
     this.http.get(wpurl).subscribe()
     console.log(wpurl)
     if(this.status == 'success'){
      this.display = 'block'
      // alert("OTP Sent Successfully!")
     }
   })
  }


  onOtpChange(event: any){ 
    if(event.length == 6){
      this.verifyForm.value.otp=event;
      console.log(this.verifyForm.value.otp);
    }
  }

  async goForm(){
     if(this.status == 'success' && this.otp == this.verifyForm.value.otp){
      this.ngxService.start()
      this.sharedService.set('mobile',this.verifyForm.value.mob)
      //alert("Verfication Successfull!")
      this.ngxService.stop()
      this.router.navigate(['form']);

     }
     else{
     alert("Incorrect OTP!!")
     }
  }

}
