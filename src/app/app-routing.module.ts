import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CheckinComponent } from './checkin/checkin.component';
import { VverifyComponent } from './vverify/vverify.component';
import { FormComponent } from './form/form.component';
import { GatepassdetailsComponent } from './gatepassdetails/gatepassdetails.component';

const routes: Routes = [
  
  {path:'', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path: 'checkin', component: CheckinComponent},
  {path: 'vverify', component:VverifyComponent},
  {path: 'form', component:FormComponent},
  {path: 'gpdetails', component:GatepassdetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }