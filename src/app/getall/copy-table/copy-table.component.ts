import { Component, OnInit } from '@angular/core'
import { HttpHeaders, HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-copy-table',
  templateUrl: './copy-table.component.html',
  styleUrls: ['./copy-table.component.css']
})
export class CopyTableComponent implements OnInit {

  copies: Copy[]

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const obs = this.http.get('http://192.168.1.100:4001/allcopies', this.options)
    obs.subscribe((response: Copy[]) => {
      this.copies = response
    })
  }
}

class Copy {
  constructor(public bookCode: string, public branchNum: number, public copyNum: number, public quality: string, public price: number) {}
}
