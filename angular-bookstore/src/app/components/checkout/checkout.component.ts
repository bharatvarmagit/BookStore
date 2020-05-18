import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  items:CartItem[]=[];
  totalPrice:number;
  totalQuantity:number;



  constructor(private _cartService:CartService,
              private _router:Router) { }

  ngOnInit() {
    this.getItems();
    this.getTotal();
  }
  getTotal() {
    this._cartService.totalPrice.subscribe(price=>this.totalPrice=price);
    this._cartService.totalQuantity.subscribe(quant=>this.totalQuantity=quant);
  }
  getItems(){
    this.items = this._cartService.cartItems;
  }
  deleteOne(book:CartItem){

    this._cartService.deleteItem(book);

    this.getItems();

    this.checkEmpty();
    this.getTotal();

  }

  checkEmpty(){
    if (this.items.length === 0) {
      this._router.navigate(['books'])
    }
  }
}
