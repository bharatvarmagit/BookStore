import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthRequest } from 'src/app/common/authRequest';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  credentials:AuthRequest;
  loginMode: boolean;
  message: string;
  authMode: string;
  principal: string;
  wrongCredentials: boolean = false;






  constructor(private http: HttpClient, private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {

    this.activeRoute.params.subscribe((params: Params) => {
      this.authMode = params['authmode'];
      this.onNewAuthMode(this.authMode);
    });


  }
  //check if user is loggin in or signing
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


    if (this.loginMode === true) {
      this.LoginRequest(form)
    }
    else {
      this.SignUpRequest(form);
    }


  }
  SignUpRequest(form: NgForm) {


    this.authService.signUpService(this.credentials)
      .subscribe(data => {
        this.LoginRequest(form);
        this.authService.loggedIn.next("Signed Up");
      });

  }
  LoginRequest(form: NgForm) {
    this.credentials = new AuthRequest(form.value["username"], form.value["password"]);
    this.authService.logInService(this.credentials)
      .subscribe((res:Response)=> {
        localStorage.removeItem("token");
        localStorage.setItem("token", res.headers.get("authorization"));

          this.authService.principal.next(this.credentials.username);
          this.authService.loggedIn.next("Logged In");
          this.router.navigate(['/books']);

      });

  }



  onSwitch() {
    this.loginMode = !this.loginMode;
    this.message = this.loginMode === true ? 'Login' : 'Sign Up';
  }

  demoLogin() {
    this.credentials = new AuthRequest("demouser","demouser");
    this.authService.logInService(this.credentials)
      .subscribe((res: Response) => {
        localStorage.setItem("token",res.headers.get("authorization"));
        this.authService.principal.next(this.credentials.username);
        this.authService.loggedIn.next("Logged In");
        this.router.navigate(['/books']);

      });


  }

}
