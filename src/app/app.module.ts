import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { HttpClientModule } from '@angular/common/http'


import { AppComponent } from './app.component';
import { BooksTableComponent } from './getall/books-table/books-table.component';
import { PublisherTableComponent } from './getall/publisher-table/publisher-table.component';
import { CopyTableComponent } from './getall/copy-table/copy-table.component';
import { AuthorTableComponent } from './getall/author-table/author-table.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksTableComponent,
    PublisherTableComponent,
    CopyTableComponent,
    AuthorTableComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
