import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/common/order';
import { CartService } from 'src/app/services/cart.service';
import {  HttpClientModule } from '@angular/common/http';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[];
  id:number=0;
  constructor(private cartService:CartService,
    private bookService:BookService,
    private router: Router) { }

  ngOnInit() {
    this.fetchOrders();
  }
  fetchOrders() {
    this.cartService.getOrdersService().subscribe(orders =>
    this.orders=orders.sort());
  }
  getSpan(itemz):number{
    let span :number=0;
    span=Object.getOwnPropertyNames(itemz).length;
    return span>2?span:2;
  }




}
