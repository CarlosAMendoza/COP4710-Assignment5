import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiConfig } from 'src/api.config'

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css']
})
export class BooksTableComponent implements OnInit {

  books: Book[]

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getBooks()
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

class Book {
  constructor(public bookCode: string, public title: string, public publisherCode: string, public type: string, public paperback: string) {}
}
