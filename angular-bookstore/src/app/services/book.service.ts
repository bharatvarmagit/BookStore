import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl ="http://localhost:8080/api/books";

  constructor(private httpClient:HttpClient) { }

  getbooks(categoryId:number):Observable<Book[]>{
    const searchUrl=`${this.baseUrl}/search/categoryid?id=${categoryId}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
      map(response=>response._embedded.books)
    );
  }
  searchbooks(keyword:string):Observable<Book[]>{
    const searchUrl=`${this.baseUrl}/search/searchbykeyword?name=${keyword}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
      map(resp=>resp._embedded.books)
      );
  }

}
interface GetResponseBooks{
  _embedded:{
    books:Book[];
  }
}
