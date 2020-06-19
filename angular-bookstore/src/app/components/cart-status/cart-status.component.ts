import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice:number = 0;
  totalQuantity:number = 0;
  constructor(private cartService:CartService,
              private _router:Router) { }

  ngOnInit() {
    if (sessionStorage.items!==undefined){
    let items:CartItem[] = JSON.parse(sessionStorage.items);
    this.cartService.cartItems=items;
    }
    this.updateCart();
  }

  updateCart() {
    this.cartService.totalPrice
    .subscribe(data=>this.totalPrice=data);

    this.cartService.totalQuantity
    .subscribe(data=>this.totalQuantity=data)
  }

  checkout(){


      this._router.navigate(['checkout'])



  }

}
