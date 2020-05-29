import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginMode:boolean;
  message:string;
  authMode:string;
  principal:string;
  wrongCredentials:boolean=false;






  constructor(private http: HttpClient,private activeRoute:ActivatedRoute,
              private authService:AuthService,
              private router:Router ) { }

  ngOnInit()
  {
    this.authService.principal.subscribe(p=>this.principal=p);
    this.activeRoute.params.subscribe((params:Params) => {
      this.authMode = params['authmode'];
      this.onNewAuthMode(this.authMode);
    });


  }
  onNewAuthMode(authMode: string) {
    if (this.authMode === "login") {
      this.loginMode = true;
      this.message = "login";
    }
    else
      if (this.authMode === "signup") {
        this.loginMode = false;
        this.message = "signup";
      }
      else
        if (this.authMode === "logout") {

        }
        else {

        }
  }

  onSubmit(form: NgForm) {


    if (this.loginMode===true){
    this.LoginRequest(form)
    }
    else{
      this.SignUpRequest(form);
    }


  }
  SignUpRequest(form:NgForm){
    this.authService.signUpService(form)
    .subscribe(data=>console.log("signed up"));
  }
  LoginRequest(form: NgForm) {
    this.authService.logInService(form)
      .subscribe((data :string) =>{
        if (data.startsWith('<')){
          this.wrongCredentials=true;
        }
        else{
          console.log("setting local storage username is ", form.value.username, "password is ", form.value.password)
          localStorage.setItem('USER',form.value.username);
          localStorage.setItem('PASS',form.value.password);
        this.authService.principal.next(data);
          this.router.navigate(['/books']);
        }
      });

  }



  onSwitch(){
    this.loginMode=!this.loginMode;
    this.message = this.loginMode === true ? 'Login' : 'Sign Up';
    }
}
