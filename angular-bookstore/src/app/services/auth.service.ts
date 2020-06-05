import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  principal:BehaviorSubject<string>=new BehaviorSubject<string>(null);
  loggedIn:BehaviorSubject<string>=new BehaviorSubject<string>("");


  constructor(private http:HttpClient) { }

  logInService(form?:NgForm,formDataStored?:FormData):Observable<string>{
    const authUrl: string = "http://localhost:8080/login";
    if (form!==null){
     var formData = new FormData()
    formData.append("username", form.value.username);
    formData.append("password", form.value.password);
      return this.http.post<string>(authUrl, formData, { responseType: 'text' as 'json' });
    }
    else{
      return this.http.post<string>(authUrl,  formDataStored, { responseType: 'text' as 'json' });
    }


  }

  signUpService(form:NgForm):Observable<any>{
    const SignUpUrl: string = "http://localhost:8080/signup";
   return this.http.post<any>(SignUpUrl, {
      username: form.value.username,
      password: form.value.password
    }, { responseType: 'text' as 'json' });
  }



  logOutService():Observable<any>{
    const logOutUrl: string = "http://localhost:8080/logout";
    this.loggedIn.next("Logged Out");
   return this.http.get<any>(logOutUrl, { responseType: 'text' as 'json' });
  }

}
