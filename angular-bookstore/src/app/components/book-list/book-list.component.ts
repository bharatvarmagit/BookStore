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
  constructor(private bookService: BookService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(()=>{
      this.listbooks();
    })

  }
  listbooks() {
    const hasCategoryId:boolean=this.activatedRoute.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get('id');
      console.log(this.currentCategoryId);
    }
    else{
      this.currentCategoryId=1;
    }
    this.bookService.getbooks(this.currentCategoryId).subscribe(
      data => this.books = data

    );
  }
}
