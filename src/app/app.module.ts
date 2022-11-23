import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { SharedModule } from 'src/shared/shared.module';
import { PatientsComponent } from './components/home/patients/patients.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewPatientComponent } from './components/home/patients/new-patient/new-patient.component';
import { MedicalHistoryComponent } from './components/home/patients/medical-history/medical-history.component';
import { AddMedicalHistoryComponent } from './components/home/patients/medical-history/add-medical-history/add-medical-history.component';
import { UpdatePatientComponent } from './components/home/patients/update-patient/update-patient.component';
import { UpdateMedicalHistoryComponent } from './components/home/patients/medical-history/update-medical-history/update-medical-history.component';
import { NgChartsModule } from 'ng2-charts';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { AddTokenInterceptor } from './helpers/add-token.interceptor';
import { ScheduleComponent } from './components/home/schedule/schedule.component';
import { AddAppointmentComponent } from './components/home/schedule/add-appointment/add-appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    PatientsComponent,
    NewPatientComponent,
    MedicalHistoryComponent,
    AddMedicalHistoryComponent,
    UpdatePatientComponent,
    UpdateMedicalHistoryComponent,
    LoginComponent,
    NavbarComponent,
    ScheduleComponent,
    AddAppointmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    NgChartsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
