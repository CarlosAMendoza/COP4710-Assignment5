import { AuthorModalComponent } from './author-modal/author.modal.component'
import { apiConfig } from 'src/api.config'
import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { Author } from '../table.model'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-author-table',
  templateUrl: './author-table.component.html',
  styleUrls: ['./author-table.component.css'],
  entryComponents: [AuthorModalComponent]
})
export class AuthorTableComponent implements OnInit {
  authors: Author[]

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAuthors()
  }

  add() {
    const modalRef = this.modalService.open(AuthorModalComponent)
    modalRef.componentInstance.action = 'Add'
    modalRef.result.then((result: Author) => {
      this.sendAdd(result)
    }, (result) => {
      console.log(result)
    })
  }

  modify(i: number) {
    const modalRef = this.modalService.open(AuthorModalComponent)
    modalRef.componentInstance.action = 'Modify'
    modalRef.componentInstance.author = new Author(this.authors[i].authorNum, this.authors[i].authorLast, this.authors[i].authorFirst)
    modalRef.result.then((result: Author) => {
      this.sendModify(result)
    }, (result) => {
      console.log(result)
    })
  }

  sendAdd(data: Author) {
    const authorNum = data.authorNum
    const obs = this.http.post( apiConfig + '/insert/author/' + authorNum, JSON.stringify(data), this.options)
    obs.subscribe((res: {inserted: boolean}) => {
      if (res.inserted) {
        this.getAuthors()
      }
    })
  }

  sendModify(data: Author) {
    const authorNum = data.authorNum
    const obs = this.http.post( apiConfig + '/modify/author/' + authorNum, JSON.stringify(data), this.options)
    obs.subscribe((res: {modified: boolean}) => {
      if (res.modified) {
        this.getAuthors()
      }
    })
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

