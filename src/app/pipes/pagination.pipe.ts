import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'paginator' })
export class PaginatorPipe implements PipeTransform {
  transform(value: Array<any>, chunkLength: number): any {
    return this.arrayToChuck(value, chunkLength);
  }

  arrayToChuck(array: Array<any>, chunkLength: number): Array<any> {
    return array.map((val, index) => {
      return index % chunkLength === 0 ? array.slice(index, index + chunkLength) : null;
    }).filter(val => val);
  }
}
