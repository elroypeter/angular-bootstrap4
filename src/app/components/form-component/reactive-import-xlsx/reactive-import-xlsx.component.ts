import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { applyMixins } from '../../../composers/component.mixin';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import readXlsxFile from 'read-excel-file';

class BaseClass { }
// tslint:disable-next-line: no-empty-interface
interface BaseClass extends DynamicFormComponent { }
applyMixins(BaseClass, [DynamicFormComponent]);

@Component({
  selector: 'app-reactive-import-xlsx',
  templateUrl: './reactive-import-xlsx.component.html',
  styleUrls: ['./reactive-import-xlsx.component.scss']
})
export class ReactiveImportXlsxComponent extends BaseClass implements OnInit, DoCheck {
  file: any;
  fileName: string | null = null;

  constructor() {
    super();
  }

  @Input() fieldId: string | null = null;
  @Input() control: AbstractControl | null = null;
  @Input() columns: Array<string>;

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngDoCheck(): void {
    super.ngDoCheck();
  }

  onFileSelect($event): void {
    this.file = $event.target.files[0];
    this.fileName = this.file.name;
    if (this._checkFileFormat(this.file.name)) {
      readXlsxFile(this.file).then((rows) => {
        this.control.setValue({
          fileName: this.file.name,
          type: 'xlsx',
          content: this._convertXlsxToJson(rows)
        });
      });

    } else {
      this.control.markAsTouched();
      this.control.setErrors({ 'incorrect-file-upload-type': true });
    }
  }

  _checkFileFormat(type: string): boolean {
    return type.includes('xlsx');
  }

  _convertXlsxToJson(sheetArray: Array<any>): Array<any> {
    const formatedData: Array<any> = [];
    sheetArray.forEach((row: Array<any>, index1: number) => {
      if (index1 !== 0) {
        const dataRow = Object.assign({});
        this.columns.forEach((column: string, index2: number) => {
          dataRow[column] = row[index2];
        });
        formatedData.push(dataRow);
      }
    });
    return formatedData;
  }
}
