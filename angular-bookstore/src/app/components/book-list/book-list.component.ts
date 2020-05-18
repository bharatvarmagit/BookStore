import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { throwIfEmpty } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];
  currentCategoryId: number=1;
  prevCategoryId:number=1;
  searchmode: boolean;
  // properties for server side pagination
  currentPage:number=1;
  pageSize:number=5;
  totalRecords:number=0;
  maxSize:number=2;


  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private cartService:CartService
              ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(() => {
      this.listbooks();
    })
  }

  //determine search mode is url has keyword? handlesearch or handlelist
  listbooks() {
    this.searchmode = this.activatedRoute.snapshot.paramMap.has('keyword');
    if (this.searchmode) {
      this.handlesearchbooks();
    }
    else {
      this.handlelistbooks();
    }

  }

  handlelistbooks() {
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get('id');
    }
    if(this.currentCategoryId!=this.prevCategoryId){
      this.currentPage=1;
    }
    this.prevCategoryId=this.currentCategoryId;
    this.bookService
    .getbooks(this.currentCategoryId,this.currentPage-1,this.pageSize)
    .subscribe(this.handlePagination());
  }




  handlesearchbooks() {
    const keyword = this.activatedRoute.snapshot.paramMap.get('keyword');
    this.bookService
    .searchbooks(keyword,this.currentPage-1,this.pageSize)
    .subscribe(this.handlePagination());
  }

  handlePagination() {
    return data => {
      this.books = data._embedded.books;
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }
  //update page size
  updatepagesize(pageSize: number){
  this.pageSize=pageSize;
  this.currentPage=1;
  this.listbooks();
}
//add to cart service
addToCart(book:Book){
  this.cartService.addToCart(new CartItem(book));


}



}


// // update pageOfBooks
// pageclick(pageOfBooks: Array<Book>){
//   this.pageOfBooks = pageOfBooks;
// }


