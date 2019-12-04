import { CopyModalComponent } from './copy-modal/copy.modal.component'
import { apiConfig } from 'src/api.config'
import { Component, OnInit } from '@angular/core'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { Copy } from '../table.model'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-copy-table',
  templateUrl: './copy-table.component.html',
  styleUrls: ['./copy-table.component.css'],
  entryComponents: [CopyModalComponent]
})
export class CopyTableComponent implements OnInit {

  copies: Copy[]

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit() {
    this.getCopies()
  }

  add() {
    const modalRef = this.modalService.open(CopyModalComponent)
    modalRef.componentInstance.action = 'Add'
    modalRef.result.then((result: Copy) => {
      this.sendAdd(result)
    }, (result) => {
      console.log(result)
    })
  }

  modify(i: number) {
    const modalRef = this.modalService.open(CopyModalComponent)
    modalRef.componentInstance.action = 'Modify'
    modalRef.componentInstance.copy = new Copy(this.copies[i].bookCode, this.copies[i].branchNum,
      this.copies[i].copyNum, this.copies[i].quality, this.copies[i].price)
    modalRef.result.then((result: Copy) => {
      this.sendModify(result)
    }, (result) => {
      console.log(result)
    })
  }

  sendAdd(data: Copy) {
    const copyNum = data.copyNum
    const obs = this.http.post( apiConfig + '/insert/copy/' + copyNum, JSON.stringify(data), this.options)
    obs.subscribe((res: {inserted: boolean}) => {
      if (res.inserted) {
        this.getCopies()
      }
    })
  }

  sendModify(data: Copy) {
    const copyNum = data.copyNum
    const bookCode = data.bookCode
    const branchNum = data.branchNum
    const obs = this.http.post( apiConfig + '/modify/copy/' + copyNum + '/' + bookCode
    + '/' + branchNum, JSON.stringify(data), this.options)
    obs.subscribe((res: {modified: boolean}) => {
      if (res.modified) {
        this.getCopies()
      }
    })
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
