import { Component, OnInit } from '@angular/core';
import { BookCategory } from 'src/app/common/bookCategory';
import { BookCategoryService } from 'src/app/services/bookCategory.service';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})
export class BookCategoryComponent implements OnInit {
  bookCategories:BookCategory[];

  constructor(private bookCategoryService:BookCategoryService) { }

  ngOnInit() {
    this.listBookCategories();
  }
  listBookCategories(){
    this.bookCategoryService.getbookcategories().subscribe(
      data=> this.bookCategories=data
      );
  }
}
