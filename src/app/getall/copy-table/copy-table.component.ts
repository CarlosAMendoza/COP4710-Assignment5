import { apiConfig } from 'src/api.config'
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
    this.getCopies()
  }

  getCopies() {
    const obs = this.http.get(apiConfig + '/allcopies', this.options)
    obs.subscribe((response: Copy[]) => {
      this.copies = response
    })
  }

  deleteButton(i: number) {
    if (confirm('Are you sure you want to delete this copy?')) {
      const copyNum = this.copies[i].copyNum
      const bookCode = this.copies[i].bookCode
      const branchNum = this.copies[i].branchNum
      const obs = this.http.delete( apiConfig + '/delete/copy/' + copyNum + '/' + bookCode + '/' + branchNum, this.options)
      obs.subscribe((res: {deleted: boolean}) => {
        if (res.deleted) {
        this.getCopies()
        }
      })
    }
  }
}

class Copy {
  constructor(public bookCode: string, public branchNum: number, public copyNum: number, public quality: string, public price: number) {}
}
