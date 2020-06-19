import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl ="https://33b776546c78.ngrok.io/api/books";

  constructor(private httpClient:HttpClient) { }

  getbooks(categoryId:number,currentPage:number,pageSize:number):Observable<GetResponseBooks>{
    const searchUrl=`${this.baseUrl}/search/categoryid?id=${categoryId}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }
  getbook(bookId:number):Observable<Book>{
    const searchUrl=`${this.baseUrl}/${bookId}`;
    return this.httpClient.get<Book>(searchUrl);
  }
  getBookId(name:String):Observable<Book>{
    const searchUrl = `${this.baseUrl}/search/bookname?name=${name}`;
    return this.httpClient.get<Book>(searchUrl);

  }



  searchbooks(keyword: string, currentPage: number, pageSize: number):Observable<GetResponseBooks>{
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }

}
interface GetResponseBooks{
  _embedded:{
    books:Book[];
  }
    page:{
      size:number,
      totalElements:number,
      totalPages:number,
      number:number
    }


}
