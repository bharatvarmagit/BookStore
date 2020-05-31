import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Form } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { Order } from 'src/app/common/order';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  principal:string;

  constructor(private router:Router,
    private authService:AuthService,
    private cartService:CartService) { }

  ngOnInit() {
    this.checkLocalStore();

    this.authService.principal.subscribe(p=>this.principal=p)

  }
  checkLocalStore() {
    const username = localStorage.USER;
    const password = localStorage.PASS;

    if (username !== undefined && password !== undefined) {
      const form: FormData=new FormData();
      form.append("username", username);
      form.append("password", password);
      this.authService.logInService(null,form)
      .subscribe(data=>{

      this.authService.principal.next(data)
      });
    }
  }
  userMenu(s:string)
  {
    if (s==="LI"){
      this.router.navigate(['auth/login' ]);
    }
    if (s==="SU"){
        this.router.navigate(['auth/signup']);
    }
    if (s==="LO"){
      this.authService.principal.next(null);
      localStorage.removeItem("USER");
      localStorage.removeItem("PASS");
      }
    if(s==="GO"){
      this.router.navigate(["/ordershistory"]);
    }

  }



}
