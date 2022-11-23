import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../models/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  myAppUrl: string
  myApiUrl: string

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = "auth/";
  }

  userLogin(login: UserLogin){
    return this.http.post(this.myAppUrl + this.myApiUrl, login)
  }

  setLocalStorage(data):void{
    localStorage.setItem('token', data)
  }

  getTokenDecoded(): any{
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('token'));
    
    return decodedToken.sub
  }

  removeLocalStorage():void{
    localStorage.removeItem('token')
  }

  getToken(): string{
    return localStorage.getItem('token')
  }
}
