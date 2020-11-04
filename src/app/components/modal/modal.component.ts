import { Component, OnInit, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() modalTitle = '';
  @Input() size: string | null = null;
  @Input() condition: boolean;
  @Input() modalActionButton: any = { method: '', text: '' };
  @Input() loading = false;
  @Output() tracker: EventEmitter<any> = new EventEmitter();

  modalRef: BsModalRef;
  dialogSize: HTMLCollectionOf<Element>;
  modalSizes: any = {
    long: 'modal-lg',
    mediun: 'modal-md',
    small: 'modal-sm'
  };

  constructor(public modalService: BsModalService) { }

  ngOnInit(): void {
    if (this.size) {
      this.dialogSize = document.getElementsByClassName('modal-dialog');
      this.dialogSize[0].classList.add(this.modalSizes[this.size]);
    }
  }

  /**
   * Opens modal
   * @param template Html element ref
   */
  openModal(template: TemplateRef<any>, tracker?: any): void {
    this.modalRef = this.modalService.show(template);

    // for using modal as edit modal
    if (tracker) {
      this.tracker.emit(tracker);
    }
  }

  /**
   * Closes modal
   */
  closeModal(): void {
    this.modalService.hide();
  }
}
