import { Publisher, action } from './../../table.model'
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-publisher-modal',
  templateUrl: './publisher.modal.component.html',
  styles: []
})
export class PublisherModalComponent implements OnInit {
  action: action
  publisher = new Publisher('', '', '')

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

  onClose() {
    if (this.isEmpty(this.publisher.publisherCode) || this.isEmpty(this.publisher.publisherName) || this.isEmpty(this.publisher.city)) {
      return
    }
    this.modal.close(this.publisher)
  }

  isEmpty(str: string): boolean {
    return (!str || 0 === str.length);
  }

}
