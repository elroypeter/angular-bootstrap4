import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() chuckRecords: Array<any> = [];
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();

  public pages: number[] = [];
  activePage: number;

  constructor() { }

  ngOnChanges(): void {
    const pageCount = this.chuckRecords.length;
    this.pages = this.getArrayOfPages(pageCount);
    this.activePage = 1;
    this.onPageChange.emit({ chunks: this.chuckRecords, currentPage: this.activePage - 1, controlClicked: false });
  }

  /**
   * Gets array of pages
   * @returns array of pages
   */
  private getArrayOfPages(pageCount: number): number[] {
    const pageArray: number[] = [];

    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }
    return pageArray;
  }

  /**
   * @method onClickPage
   * @desc Determines which page is loaded onclick
   */
  onClickPage(pageNumber: number): void {
    if (pageNumber < 1) { return; }
    if (pageNumber > this.pages.length) { return; }
    this.activePage = pageNumber;
    this.onPageChange.emit({ chunks: this.chuckRecords, currentPage: this.activePage - 1, controlClicked: true });
  }
}
