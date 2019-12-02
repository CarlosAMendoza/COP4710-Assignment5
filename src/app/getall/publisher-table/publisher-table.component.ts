import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

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
    const obs = this.http.get('http://192.168.1.100:4001/allpubs', this.options)
    obs.subscribe((response: Publisher[]) => {
      this.publishers = response
    })
  }

}

class Publisher {
  constructor(public publisherCode: string, public publisherName: string, public city: string) {}
}
