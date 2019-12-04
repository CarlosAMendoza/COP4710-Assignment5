import { Book } from './../books-table.component'
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

type action = 'Modify' | 'Add'

@Component({
  selector: 'app-book-modal',
  templateUrl: './book.modal.component.html'
})
export class BookModalComponent implements OnInit {
  action: action
  book = new Book('', '', '', '', '')

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

  onClose() {
    if (this.isEmpty(this.book.bookCode) || this.isEmpty(this.book.title) || this.isEmpty(this.book.publisherCode)
    || this.isEmpty(this.book.type) || this.isEmpty(this.book.paperback)) {
      return
    }
    this.modal.close(this.book)
  }

  isEmpty(str: string): boolean {
    return (!str || 0 === str.length);
  }
}

