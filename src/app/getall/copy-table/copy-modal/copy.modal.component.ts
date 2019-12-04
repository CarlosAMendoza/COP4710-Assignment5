import { action, Copy } from './../../table.model'
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-copy-modal',
  templateUrl: './copy.modal.component.html'
})
export class CopyModalComponent implements OnInit {
  action: action
  copy = new Copy('', 0, 0, '', 0)

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

  onClose() {
    if (this.isEmpty(this.copy.bookCode) || this.isEmpty(this.copy.quality)) {
      return
    }
    this.modal.close(this.copy)
  }

  isEmpty(str: string): boolean {
    return (!str || 0 === str.length);
  }

}
