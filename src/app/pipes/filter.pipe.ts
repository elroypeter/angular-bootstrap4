import { Pipe, PipeTransform } from '@angular/core';
import { FilterService } from '../services/filter/filter.service';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  constructor(private filterService: FilterService) { }

  transform(value: any, filter: Array<string>, seacrhInput: string, isAnd: boolean, what: string): any {
    if (filter && Array.isArray(value)) {
      if (isAnd) { // for array of filters
        const m = value.filter((ele: any) => {
          filter.reduce((memo, keyName) => {
            return (memo && new RegExp(seacrhInput, 'gi').test(this.deeperKeys(ele, keyName))) || seacrhInput === '';
          }, true);
        });
        this.filterService.setFilteredList({ list: m, id: what });
        return m;
      } else { // for single filter
        const m = value.filter((ele: any) => {
          return filter.some((keyName) => {
            return new RegExp(seacrhInput, 'gi').test(this.deeperKeys(ele, keyName)) || seacrhInput === '';
          });
        });
        this.filterService.setFilteredList({ list: m, id: what });
        return m;
      }
    } else {
      return value;
    }
  }

  deeperKeys(data: any, keyString: string): any {
    const keyArr = keyString.split('|');
    let result = data;
    keyArr.forEach(ele => {
      result = result[ele];
    });
    return result;
  }
}
