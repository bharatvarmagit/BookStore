import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/common/order';
import { CartService } from 'src/app/services/cart.service';
import {   HttpClient } from '@angular/common/http';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[];
  id:number;
  loading:boolean;
  constructor(private cartService:CartService,
    private bookService:BookService,
    private router: Router,
    private http:HttpClient) { }

  ngOnInit() {
    this.loading=true;
    this.fetchOrders();
  }
  fetchOrders() {
    this.cartService.getOrdersService().subscribe(orders =>
    {this.orders=orders.sort((a:Order,b:Order)=>{
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
    const findurl:string =`http://localhost:8080/getbookid?name=${name}`;
    this.http.get<number>(findurl,{responseType: 'text' as 'json'}).subscribe(data=>{

    this.router.navigate([`/books/${data}`])});

  }
  deleteOrder(id){
    const url:string=`http://localhost:8080/deleteorder?orderId=${id}`;
    this.http.delete(url,{responseType:'text' as 'json'}).subscribe(
      data=>this.fetchOrders());
  }



}
