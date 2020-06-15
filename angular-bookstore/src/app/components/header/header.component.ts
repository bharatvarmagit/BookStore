import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

import { CartService } from 'src/app/services/cart.service';


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

    if(localStorage.token!==undefined){
      this.authService.getPrincipalfromJwt().subscribe(data=>{
      this.authService.principal.next(data);
      this.authService.loggedIn.next("Logged In");
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
      this.authService.loggedIn.next("Logged Out");
      localStorage.removeItem("token");
      this.router.navigate(["/books"]);
      }
    if(s==="GO"){
      this.router.navigate(["/ordershistory"]);
    }

  }



}
