import { Book } from './../table.model'
import { BookModalComponent } from './book.modal/book.modal.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiConfig } from 'src/api.config'

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css'],
  entryComponents: [BookModalComponent]
})
export class BooksTableComponent implements OnInit {

  books: Book[]

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit() {
    this.getBooks()
  }

  add() {
    const modalRef = this.modalService.open(BookModalComponent)
    modalRef.componentInstance.action = 'Add'
    modalRef.result.then((result: Book) => {
      this.sendAdd(result)
    }, (result) => {
      console.log(result)
    })
  }

  modify(i: number) {
    const modalRef = this.modalService.open(BookModalComponent)
    modalRef.componentInstance.action = 'Modify'
    modalRef.componentInstance.book = new Book(this.books[i].bookCode, this.books[i].title, this.books[i].publisherCode,
      this.books[i].type, this.books[i].paperback)
    modalRef.result.then((result: Book) => {
      this.sendModify(result)
    }, (result) => {
      console.log(result)
    })
  }

  sendAdd(data: Book) {
    const bookCode = data.bookCode
    const obs = this.http.post( apiConfig + '/insert/book/' + bookCode, JSON.stringify(data), this.options)
    obs.subscribe((res: {inserted: boolean}) => {
      if (res.inserted) {
        this.getBooks()
      }
    })
  }

  sendModify(data: Book) {
    const bookCode = data.bookCode
    const obs = this.http.post( apiConfig + '/modify/book/' + bookCode, JSON.stringify(data), this.options)
    obs.subscribe((res: {modified: boolean}) => {
      if (res.modified) {
        this.getBooks()
      }
    })
  }

  private getBooks() {
    const obs = this.http.get(apiConfig + '/allbooks', this.options)
    obs.subscribe((response: Book[]) => {
      this.books = response
    })
  }

  deleteButton(i: number) {
    if (confirm('Are you sure you want to delete ' + this.books[i].title)) {
      const bookCode = this.books[i].bookCode
      const obs = this.http.delete( apiConfig + '/delete/book/' + bookCode, this.options)
      obs.subscribe((res: {deleted: boolean}) => {
        if (res.deleted) {
        this.getBooks()
        }
      })
    }
  }

}


