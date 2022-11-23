import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {


  myAppUrl: string
  myApiUrl: string

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = "patient/";
  }

  GetPatient(patientId: number){
    return this.http.get(this.myAppUrl + this.myApiUrl + patientId)
  }
  GetPatients(userId: number){
    return this.http.get(this.myAppUrl + this.myApiUrl + `getUserPatients/${userId}`)
  }
  GetNumberOfPatientsGender(userId: number, gender?:string){
    return this.http.get(this.myAppUrl + this.myApiUrl + `getUserPatients/${userId}/findPatientsByGender`)
  }
  SavePatient(patient: Patient): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, patient)
  }
  DeletePatient(patientId: number){
    return this.http.delete(this.myAppUrl + this.myApiUrl + patientId)
  }
  UpdatePatient(patientId: number, patient: Patient){
    return this.http.put(this.myAppUrl + this.myApiUrl + patientId,patient)
  }
  SearchPatient(patientFullname: String){
    return this.http.get(this.myAppUrl + this.myApiUrl + "searchPatientByFullname/" + patientFullname)
  }
}
