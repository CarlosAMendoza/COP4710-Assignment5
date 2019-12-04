import { action, Author } from './../../table.model'
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-author-modal',
  templateUrl: './author.modal.component.html',
  styles: []
})
export class AuthorModalComponent implements OnInit {
  action: action
  author = new Author(0, '', '')

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

  onClose() {
    if (this.isEmpty(this.author.authorFirst) || this.isEmpty(this.author.authorLast)) {
      return
    }
    this.modal.close(this.author)
  }

  isEmpty(str: string): boolean {
    return (!str || 0 === str.length);
  }

}
