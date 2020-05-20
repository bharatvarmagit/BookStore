import { Injectable, OnInit } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems:CartItem[]=[]
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(sessionStorage.TP !== undefined ? sessionStorage.TP : 0 );
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(sessionStorage.TQ !== undefined ? sessionStorage.TQ : 0 );


  constructor() { }





  addToCart(cartItem:CartItem){

   let itemExists=this.cartItems.find(item=>item.id===cartItem.id);
   if (itemExists===undefined){
    this.cartItems.push(cartItem);
   }
   else{
     itemExists.quantity++;
   }
   sessionStorage.setItem("items",JSON.stringify(this.cartItems))

   this.calPriceAndQuant();

  }

  deleteItem(item:CartItem){
    let delItem = this.cartItems.find(b => b.id === item.id);
    if (item.quantity > 1) {
      item.quantity--;
    }
    else {
      let ind = this.cartItems.findIndex(b => b.id === item.id);
      this.cartItems.splice(ind - 1, 1);
    }
    sessionStorage.setItem("items", JSON.stringify(this.cartItems))
    this.calPriceAndQuant();
  }
  calPriceAndQuant() {
    let totalPriceVal:number=0;
    let totalQuantityVal:number=0;

    for(let item of this.cartItems){
      totalPriceVal+=item.quantity*item.unitPrice;
      totalQuantityVal+=item.quantity;
    }
    sessionStorage.setItem("TP",totalPriceVal.toString());
    sessionStorage.setItem("TQ",totalQuantityVal.toString());

    this.totalPrice.next(totalPriceVal);
    this.totalQuantity.next(totalQuantityVal);
  }
}
