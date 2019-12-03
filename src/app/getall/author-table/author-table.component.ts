import { apiConfig } from 'src/api.config'
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
    this.getAuthors()
  }

  getAuthors() {
    const obs = this.http.get(apiConfig + '/allauthors', this.options)
    obs.subscribe((response: Author[]) => {
      this.authors = response
    })
  }

  deleteButton(i: number) {
    if (confirm('Are you sure you want to delete ' + this.authors[i].authorNum)) {
      const authorNum = this.authors[i].authorNum
      const obs = this.http.delete( apiConfig + '/delete/author/' + authorNum, this.options)
      obs.subscribe((res: {deleted: boolean}) => {
        if (res.deleted) {
        this.getAuthors()
        }
      })
    }
  }

}

class Author {
  constructor(public authorNum: number, public authorLast: string, public authorFirst: string) {}
}
