import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/common/book';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book:Book ;

  constructor(private _bookService:BookService,private _activatedroute:ActivatedRoute) { }

  ngOnInit() {
    this._activatedroute.paramMap.subscribe(()=>
    {
      this.getbookinfo();
    })

  }
  getbookinfo(){
    const id:number=+this._activatedroute.snapshot.paramMap.get('id');
    this._bookService.getbook(id).subscribe(data=>this.book=data);
  }

}
