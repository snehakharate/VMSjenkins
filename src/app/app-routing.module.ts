import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { VverifyComponent } from './vverify/vverify.component';
import { FormComponent } from './form/form.component';
import { GatepassdetailsComponent } from './gatepassdetails/gatepassdetails.component';
import { combineChange } from '@angular/fire/compat/firestore';
import { CheckinComponent } from './checkin/checkin.component';
import { DailyVisitorComponent } from './daily-visitor/daily-visitor.component';
import { PreAppointmentComponent } from './pre-appointment/pre-appointment.component';
import { GatePassComponent } from './gate-pass/gate-pass.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [

  {path:'', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path: 'vverify', component:VverifyComponent},
  {path: 'form', component:FormComponent},
  //{path: 'gpdetails', component:GatepassdetailsComponent},
  {path: 'checkout',
      component: CheckinComponent, 
      children: [
        {
          path: 'gpdetails',
          component: GatepassdetailsComponent
        }
      ]
    },  
  {path:'dailyVisitor', component: DailyVisitorComponent,
  children: [
    {
      path: 'gpdetails',
      component: GatepassdetailsComponent
    }
  ]},
  {path:'preApp', component: PreAppointmentComponent},
  {path: 'gatepass', component:GatePassComponent},
  {path:'forgotPass', component:ForgotPasswordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
