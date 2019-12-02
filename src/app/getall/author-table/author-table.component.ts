import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-author-table',
  templateUrl: './author-table.component.html',
  styleUrls: ['./author-table.component.css']
})
export class AuthorTableComponent implements OnInit {
  authors: Author[]

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const obs = this.http.get('http://192.168.1.100:4001/allauthors', this.options)
    obs.subscribe((response: Author[]) => {
      this.authors = response
    })
  }

}

class Author {
  constructor(public authorNum: number, public authorLast: string, public authorFirst: string) {}
}
