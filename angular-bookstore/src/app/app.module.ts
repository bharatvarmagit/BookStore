import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookService } from './services/book.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes:Routes=[
  {path:'books',component:BookListComponent},
  {path:'category/:id',component:BookListComponent},
  {path:'',redirectTo:'/books',pathMatch:'full'},
  { path: '**', component: PageNotFoundComponent}
]

const routes:Routes=[
  {path:'books',component:BookListComponent},
  {path:'category/:id',component:BookListComponent},
  {path:'category',component:BookListComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
