import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public sharedService: SharedServiceService, public router: Router) { }

  ngOnInit(): void {
    if(this.sharedService.get('userId') == ''){
        this.router.navigate(['']);
    }
  }

}
