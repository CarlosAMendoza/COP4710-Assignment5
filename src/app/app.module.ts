import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { BooksTableComponent } from './getall/books-table/books-table.component';
import { PublisherTableComponent } from './getall/publisher-table/publisher-table.component';
import { CopyTableComponent } from './getall/copy-table/copy-table.component';
import { AuthorTableComponent } from './getall/author-table/author-table.component';
import { BookModalComponent } from './getall/books-table/book.modal/book.modal.component';
import { PublisherModalComponent } from './getall/publisher-table/publisher-modal/publisher.modal.component';
import { AuthorModalComponent } from './getall/author-table/author-modal/author.modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksTableComponent,
    PublisherTableComponent,
    CopyTableComponent,
    AuthorTableComponent,
    BookModalComponent,
    PublisherModalComponent,
    AuthorModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    BookModalComponent,
    PublisherModalComponent,
    AuthorModalComponent
  ]
})
export class AppModule { }
