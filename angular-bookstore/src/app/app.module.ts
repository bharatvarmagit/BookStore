import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookService } from './services/book.service';
import {CartService} from './services/cart.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BookCategoryComponent } from './components/book-category/book-category.component';
import { SearchComponent } from './components/search/search.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import {JwPaginationComponent} from 'jw-angular-pagination';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthComponent } from './components/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './components/auth/auth-interceptor.service';
import { OrderListComponent } from './components/order-list/order-list.component';
import {OrderModule} from 'ngx-order-pipe';


const routes:Routes=[
  {path: 'books/:id', component: BookDetailsComponent},
  {path:'books',redirectTo:'/category/1',pathMatch:'full'},
  {path:'category/:id',component:BookListComponent},
  {path:'search/:keyword',component:BookListComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'auth/:authmode',component:AuthComponent},
  {path:'ordershistory',component:OrderListComponent},
  { path: '', redirectTo:  '/category/1',pathMatch:'full'},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    BookCategoryComponent,
    SearchComponent,
    BookDetailsComponent,
    JwPaginationComponent,
    CartStatusComponent,
    CheckoutComponent,
    AuthComponent,
    OrderListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    OrderModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{provide:HTTP_INTERCEPTORS,
              useClass:AuthInterceptorService,
             multi:true},
    BookService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
