import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookCategory } from '../common/bookCategory';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookCategoryService {
  private baseUrl = "http://localhost:8080/api/book-category";

  constructor(private httpClient: HttpClient) { }

  getbookcategories(): Observable<BookCategory[]> {

    return this.httpClient.get<GetResponseBookCategories>(this.baseUrl)
    .pipe(map(resp=>resp._embedded.BookCategory));

  }
}

interface GetResponseBookCategories {
  _embedded: {
    BookCategory: BookCategory[];
  }
}
