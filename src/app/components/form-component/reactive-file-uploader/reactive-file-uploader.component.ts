import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { applyMixins } from '../../../composers/component.mixin';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

class BaseClass { }
// tslint:disable-next-line: no-empty-interface
interface BaseClass extends DynamicFormComponent { }
applyMixins(BaseClass, [DynamicFormComponent]);

@Component({
  selector: 'app-reactive-file-uploader',
  templateUrl: './reactive-file-uploader.component.html',
  styleUrls: ['./reactive-file-uploader.component.scss']
})
export class ReactiveFileUploadComponent extends BaseClass implements OnInit, DoCheck {
  fileInput: HTMLElement;
  fileName: string | null = null;
  fileType: string | null = null;
  file: any;
  validTypes: Array<string> = ['pdf', 'jpeg', 'png', 'webp'];

  constructor() {
    super();
  }

  @Input() fieldId: string | null = null;
  @Input() control: AbstractControl | null = null;
  @Input() fileDesciption: string | null = null;
  @Input() defaultFileName = '';

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngDoCheck(): void {
    super.ngDoCheck();
  }

  /**
   * Determines whether file select on
   * @param $event [file change event]
   */
  onFileSelect($event): void {
    this.file = $event.target.files[0];
    if (this.file) {
      const originalType = this.file.type.split('/')[1];

      // validating selected image file
      if (!this.checkForFileType(originalType)) {
        this.control.markAsTouched();
        this.control.setErrors({ 'incorrect-file-upload-type': true });
      } else {
        this.fileName = this.file.name;
        this.fileType = this.file.type.split('/')[1];

        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.control.setValue({
            fileName: this.defaultFileName !== '' ? this.defaultFileName : this.fileName,
            type: this.fileType,
            content: event.target.result.split(',')[1],
            description: (this.fileDesciption === null) ? '' : this.fileDesciption
          });
        };
        reader.readAsDataURL(this.file);
      }
    }
  }

  /**
   * Checks for file type if is among accepted type [png, jpeg, webp]
   * @param type [file type]
   * @returns for file type
   */
  checkForFileType(type: string): boolean {
    return this.validTypes.find(val => val === type) ? true : false;
  }
}
