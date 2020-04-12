import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];
  currentCategoryId:number;
  searchmode:boolean;
  constructor(private bookService: BookService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(()=>{
      this.listbooks();
    })

  }
  listbooks() {
    this.searchmode=this.activatedRoute.snapshot.paramMap.has('keyword');
    if (this.searchmode){
      this.handlesearchbooks();
    }
    else{
      this.handlelistboooks();
    }


    }
    handlelistboooks(){
      const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has('id');
      if (hasCategoryId) {
        this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get('id');
      }
      else {
        this.currentCategoryId = 1;
      }
      this.bookService.getbooks(this.currentCategoryId).subscribe(
        data => this.books = data

      );

    }
    handlesearchbooks(){
      const keyword= this.activatedRoute.snapshot.paramMap.get('keyword');
      this.bookService.searchbooks(keyword).subscribe(
        data=> this.books=data
      )

    }
}
