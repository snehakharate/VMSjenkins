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

  display = 'none';
  private otp = '';
  dataNew: any;
  data:any;
  status = '';
  verifyForm = new FormGroup({
    mob: new FormControl('', Validators.compose([Validators.required])),
    otp: new FormControl('', Validators.compose([Validators.required]))
  });
  constructor(public router: Router, private http: HttpClient, public sharedService: SharedServiceService) { }

  ngOnInit(): void {
    if(!this.sharedService.get('userId')){
      this.router.navigate(['']);
      console.log(this.sharedService.get('userId'))
  }
  }

  sendOTP(){
    const url = 'https://usmartsms.herokuapp.com/?token='+environment.apiKey+'&mobile=91'+this.verifyForm.value.mob
    console.log(url)
    this.http.get(url).subscribe((res)=>{
     this.data = res
     this.status = this.data.status.toString()
     this.otp = this.data.message.content.toString().split(' ')[4].toString()
     if(this.status == 'success'){
      this.display = 'block'
     }
   })
  }

  async goForm(){
     if(this.status == 'success' && this.otp == this.verifyForm.value.otp){
      this.sharedService.set('mobile',this.verifyForm.value.mob)
      this.router.navigate(['form']);
     }
  }

}
