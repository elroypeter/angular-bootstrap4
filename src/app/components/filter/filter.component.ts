import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() filterableList: any[] = [];
  @Output() filters: EventEmitter<Array<string>> = new EventEmitter();

  addedFilters: Array<any> = [];
  searchQuery = '';
  filterList: Array<string> = ['name'];

  constructor() { }

  ngOnInit(): void { }

  /**
   * Removes item from list from filter
   */
  removeFromFilter(item: any): void {
    const index = this.checkIfItemExist(item);
    if (index >= 0) {
      this.addedFilters.splice(index, 1);
      this.filters.emit(this.getFilterableStrings(this.addedFilters));
    }
  }

  /**
   * Adds item to filter
   */
  addItemToFilter(item: any): void {
    if (this.checkIfItemExist(item) >= 0) {
      return;
    }
    this.addedFilters.push(item);
    this.filters.emit(this.getFilterableStrings(this.addedFilters));
  }

  /**
   * Checks if item exist
   */
  checkIfItemExist(item: any): number {
    const index = this.addedFilters.findIndex(val => val.id === item.id);
    if (typeof index !== 'undefined') {
      return index;
    }
    return -1;
  }

  getFilterableStrings(array: Array<any>): any {
    return array.map(val => val.name);
  }
}
