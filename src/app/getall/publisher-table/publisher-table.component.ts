import { PublisherModalComponent } from './publisher-modal/publisher.modal.component'
import { apiConfig } from 'src/api.config'
import { Component, OnInit } from '@angular/core'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { Publisher } from '../table.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-publisher-table',
  templateUrl: './publisher-table.component.html',
  styleUrls: ['./publisher-table.component.css']
})
export class PublisherTableComponent implements OnInit {

  publishers: Publisher[]

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit() {
    this.getPubs()
  }

  add() {
    const modalRef = this.modalService.open(PublisherModalComponent)
    modalRef.componentInstance.action = 'Add'
    modalRef.result.then((result: Publisher) => {
      this.sendAdd(result)
    }, (result) => {
      console.log(result)
    })
  }

  modify(i: number) {
    const modalRef = this.modalService.open(PublisherModalComponent)
    modalRef.componentInstance.action = 'Modify'
    modalRef.componentInstance.publisher = new Publisher(this.publishers[i].publisherCode, this.publishers[i].publisherName,
      this.publishers[i].city)
    modalRef.result.then((result: Publisher) => {
      this.sendModify(result)
    }, (result) => {
      console.log(result)
    })
  }

  sendAdd(data: Publisher) {
    const publisherCode = data.publisherCode
    const obs = this.http.post( apiConfig + '/insert/pub/' + publisherCode, JSON.stringify(data), this.options)
    obs.subscribe((res: {inserted: boolean}) => {
      if (res.inserted) {
        this.getPubs()
      }
    })
  }

  sendModify(data: Publisher) {
    const publisherCode = data.publisherCode
    const obs = this.http.post( apiConfig + '/modify/pub/' + publisherCode, JSON.stringify(data), this.options)
    obs.subscribe((res: {modified: boolean}) => {
      if (res.modified) {
        this.getPubs()
      }
    })
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

// class Publisher {
//   constructor(public publisherCode: string, public publisherName: string, public city: string) {}
// }
