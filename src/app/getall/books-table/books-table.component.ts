import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    const obs = this.http.get('http://192.168.1.100:4001/allbooks', this.options)
    obs.subscribe((response: Book[]) => {
      this.books = response
    })
  }

}

class Book {
  constructor(public bookCode: string, public title: string, public publisherCode: string, public type: string, public paperback: string) {}
}
