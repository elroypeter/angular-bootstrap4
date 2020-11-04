import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public filter = new BehaviorSubject<any>({});
  public filteredList = this.filter.asObservable();

  setFilteredList(list: any): void {
    this.filter.next(list);
  }
}
