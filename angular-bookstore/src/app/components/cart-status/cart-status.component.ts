import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

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
    this.updateCart();
  }
  updateCart() {
    this.cartService.totalPrice
    .subscribe(data=>this.totalPrice=data);

    this.cartService.totalQuantity
    .subscribe(data=>this.totalQuantity=data)
  }

  checkout(){
    if (this.totalQuantity<1){
      alert("cart is empty")
    }
    else{
      this._router.navigate(['checkout'])

    }

  }

}
