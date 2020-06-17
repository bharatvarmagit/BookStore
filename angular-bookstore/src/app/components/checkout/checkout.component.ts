import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  items:CartItem[]=[];
  totalPrice:number;
  totalQuantity:number;
  principal:string;
  ordered:boolean=false;



  constructor(private _cartService:CartService,
              private _router:Router,
              private authService:AuthService) { }

  ngOnInit() {
    this.authService.principal.subscribe(p=>this.principal=p);

    this.loadSessionItems();
    this.getItems();
    this.getTotal();

  }
  loadSessionItems() {
    if (sessionStorage.items !== undefined) {
      let items: CartItem[] = JSON.parse(sessionStorage.items);
      this._cartService.cartItems = items;
    }
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


    this.getTotal();

  }
  addOne(book:CartItem){
    this._cartService.addToCart(book);
    this.getItems();
    this.getTotal();
  }
  placeOrder(){
    const order={};

    for(let item of this.items){
      order[item.id]=item.quantity;
    }

    this._cartService.placeOrderService(order,this.totalPrice,this.principal).subscribe(data=>
      {
      this._router.navigate(["ordershistory"]);
      }
    );
    this.items.length = 0;
    this.clearCart();
    this.ordered=true;




  }

  clearCart(){
    this._cartService.clearCart();
    this.items.length=0;
    sessionStorage.removeItem('items');

    // this.getItems();
    // this.getTotal();

    }
  }


