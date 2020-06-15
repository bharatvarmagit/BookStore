import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthRequest } from '../common/authRequest';
import { observeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  baseUrl: string ="http://localhost:8080/";
  principal:BehaviorSubject<string>=new BehaviorSubject<string>(null);
  loggedIn:BehaviorSubject<string>=new BehaviorSubject<string>("");


  constructor(private http:HttpClient) { }

  logInService(credentials:AuthRequest):Observable<any>{

    const authUrl: string = `${this.baseUrl}login`;
    return this.http.post<string>(authUrl, credentials,{observe:"response"});
  }

  signUpService(credentials:AuthRequest):Observable<any>{

    const SignUpUrl: string = `${this.baseUrl}signup`;
    return this.http.post<any>(SignUpUrl,
        credentials,
        { responseType: 'text' as 'json' });
  }
  getPrincipalfromJwt(){
    return this.http.get<any>(this.baseUrl,{ responseType:'text' as 'json'});
  }



}
