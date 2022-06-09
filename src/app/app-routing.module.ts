import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CheckinComponent } from './checkin/checkin.component';

const routes: Routes = [
  
  {path:'', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path: 'checkin', component: CheckinComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }