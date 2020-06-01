import { Component, OnInit, Output ,EventEmitter, Input} from '@angular/core';
import { BookCategory } from 'src/app/common/bookCategory';
import { BookCategoryService } from 'src/app/services/bookCategory.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})
export class BookCategoryComponent implements OnInit {
  bookCategories:BookCategory[];
  @Output() sortCriteria: EventEmitter<string> = new EventEmitter();
  @Input() showFilter:string;

  constructor(private bookCategoryService:BookCategoryService) { }

  ngOnInit() {

    this.listBookCategories();
  }
  listBookCategories(){
    this.bookCategoryService.getbookcategories().subscribe(
      data=> this.bookCategories=data
      );
  }
  onSubmit(f:NgForm){
    this.sortCriteria.emit(f.value['orderPrice']);

  }
}
