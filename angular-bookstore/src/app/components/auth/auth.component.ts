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
    .subscribe(data=>{
      this.LoginRequest(form);
      this.authService.loggedIn.next("Signed Up");
    });

  }
  LoginRequest(form: NgForm) {
    this.authService.logInService(form)
      .subscribe((data :string) =>{
        if (data.startsWith('<')){
          this.wrongCredentials=true;
          form.reset();
        }
        else{
          localStorage.setItem('USER',form.value.username);
          localStorage.setItem('PASS',form.value.password);
        this.authService.principal.next(form.value.username);
        this.authService.loggedIn.next("Logged In");
          this.router.navigate(['/books']);
        }
      });

  }



  onSwitch(){
    this.loginMode=!this.loginMode;
    this.message = this.loginMode === true ? 'Login' : 'Sign Up';
    }
    demoLogin(){
      const formdata:FormData=new FormData();
      formdata.append("username","demouser");
      formdata.append("password","demouser");
      this.authService.logInService(null,formdata)
        .subscribe((data: string) => {

            localStorage.setItem('USER', "demouser");
            localStorage.setItem('PASS', "demouser");
            this.authService.principal.next("demouser");
            this.authService.loggedIn.next("Logged In");
            this.router.navigate(['/books']);

        });


    }

}
