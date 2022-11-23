import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  myAppUrl: string
  myApiUrl: string

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = "appointment/";
  }

  getAppointmentsByUser(userId:number){
    return this.http.get(this.myAppUrl + this.myApiUrl + 'byuser/' + userId)
  }
  saveAppointment(appointment:Appointment){
    return this.http.post(this.myAppUrl + this.myApiUrl,appointment)
  }
}
