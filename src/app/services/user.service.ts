import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  myAppUrl: string
  myApiUrl: string

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = "user/";
  }

  GetUser(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + id)
  }
  GetTotalOfMedicalHistoriesByUser(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + `getTotalOfMedicalHistoriesByUser/${id}`)
  }

}
