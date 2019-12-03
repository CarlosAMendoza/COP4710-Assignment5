import { apiConfig } from 'src/api.config'
import { Component, OnInit } from '@angular/core'
import { HttpHeaders, HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-publisher-table',
  templateUrl: './publisher-table.component.html',
  styleUrls: ['./publisher-table.component.css']
})
export class PublisherTableComponent implements OnInit {

  publishers: Publisher[]

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPubs()
  }

  getPubs() {
    const obs = this.http.get(apiConfig + '/allpubs', this.options)
    obs.subscribe((response: Publisher[]) => {
      this.publishers = response
    })
  }

  deleteButton(i: number) {
    if (confirm('Are you sure you want to delete ' + this.publishers[i].publisherName)) {
      const pubCode = this.publishers[i].publisherCode
      const obs = this.http.delete( apiConfig + '/delete/pub/' + pubCode, this.options)
      obs.subscribe((res: {deleted: boolean}) => {
        if (res.deleted) {
        this.getPubs()
        }
      })
    }
  }

}

class Publisher {
  constructor(public publisherCode: string, public publisherName: string, public city: string) {}
}
