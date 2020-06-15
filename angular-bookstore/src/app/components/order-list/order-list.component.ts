import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/common/order';
import { CartService } from 'src/app/services/cart.service';
import {   HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  baseUrl:string="http://localhost:8080";
  principal:string;
  orders: Order[];

  id:number;
  loading:boolean;
  constructor(private cartService:CartService,
    private authService:AuthService,
    private router: Router,
    private http:HttpClient) { }

  ngOnInit() {


    this.loading=true;
    this.fetchOrders();
  }
   fetchOrders() {

    this.cartService.getOrdersService(localStorage.USER).subscribe(orders =>
    {
      console.log("got orders")
      this.orders=orders.sort((a:Order,b:Order)=>
      {
      return a.id<b.id?1:-1
       })
    this.loading=false;
  });
}
  getSpan(itemz):number{
    let span :number=0;
    span=Object.getOwnPropertyNames(itemz).length;
    return span>2?span:2;
  }
  goToBook(name:string){
    const findurl: string =`${this.baseUrl}/getbookid?name=${name}`;
    this.http.get<number>(findurl,{responseType: 'text' as 'json'}).subscribe(data=>{

    this.router.navigate([`/books/${data}`])});

  }
  deleteOrder(id){
    const url: string = `${this.baseUrl}/deleteorder?orderId=${id}`;
    this.http.delete(url,{responseType:'text' as 'json'}).subscribe(
      data=>this.fetchOrders());
  }



}
