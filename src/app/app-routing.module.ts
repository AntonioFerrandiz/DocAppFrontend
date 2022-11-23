import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { PatientsComponent } from './components/home/patients/patients.component';
import { MedicalHistoryComponent } from './components/home/patients/medical-history/medical-history.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { ScheduleComponent } from './components/home/schedule/schedule.component';


const routes: Routes = [
  //   { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
    {path: 'home', component: DashboardComponent},
    { path: 'patients', component: PatientsComponent },
    { path: 'patients/medical-history/:id', component: MedicalHistoryComponent },
    {path: 'schedule', component: ScheduleComponent}
  ]},
  


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
