import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MedicalHistory } from '../models/medical-history.model';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {

  myAppUrl: string
  myApiUrl: string

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = "medicalHistory/";
  }

  CreateMedicalHistory(medicalHistory: MedicalHistory){
    return this.http.post(this.myAppUrl + this.myApiUrl, medicalHistory)
  }

  GetAllMedicalHistoryByPatient(patientId: number){
    return this.http.get(this.myAppUrl + this.myApiUrl + 'patient/' + patientId)
  }
  GetMedicalHistory(id: number){
    return this.http.get(this.myAppUrl + this.myApiUrl + id)
  }
  DeleteMedicalHistory(medicalHistoryId: number){
    return this.http.delete(this.myAppUrl + this.myApiUrl + medicalHistoryId)
  }
}
