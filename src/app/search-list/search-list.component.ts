import { Component, OnInit, Input } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { apiConfig } from 'src/api.config';

type search = [{bookCode: string, title: string, publisherCode: string, publisherName: string, city: string,
  inventory: [{branchNum: number, onHand: number, branchName: string, branchLocation: string}]
}]

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styles: []
})
export class SearchListComponent implements OnInit {
  results: search
  @Input() search: string

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getSearch()
  }

  getSearch() {
    if (this.isEmpty(this.search)) {
      this.results.splice(0,this.results.length)
      return
    }
    const obs = this.http.get(apiConfig + '/search/' + this.search, this.options)
    obs.subscribe((response: search) => {
      this.results = response
      console.log(this.results)
    }, () => {
      this.results.splice(0,this.results.length)
    })
  }

  isEmpty(str: string): boolean {
    return (!str || 0 === str.length);
  }

}
