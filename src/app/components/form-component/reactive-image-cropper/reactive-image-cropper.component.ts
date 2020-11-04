import { Component, OnInit, Input, DoCheck } from '@angular/core';
const Croppie = require('croppie');
import { AbstractControl } from '@angular/forms';
import { applyMixins } from '../../../composers/component.mixin';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

class BaseClass { }
// tslint:disable-next-line: no-empty-interface
interface BaseClass extends DynamicFormComponent { }
applyMixins(BaseClass, [DynamicFormComponent]);

@Component({
  selector: 'app-reactive-image-cropper',
  templateUrl: './reactive-image-cropper.component.html',
  styleUrls: ['./reactive-image-cropper.component.scss']
})
export class ReactiveImageCropperComponent extends BaseClass implements OnInit, DoCheck {
  cropperPlaceHolder: HTMLElement;
  preview: string;
  resize: any;
  file: any;
  validTypes: Array<string> = ['jpeg', 'png', 'webp'];

  constructor() {
    super();
  }

  @Input() fieldId: string | null = null;
  @Input() control: AbstractControl | null = null;
  @Input() canvasHeight = 300;
  @Input() cropperWidth = 200;
  @Input() cropperHeight = 200;

  ngDoCheck(): void {
    super.ngDoCheck();
  }

  ngOnInit(): void {
    super.ngOnInit();

    // initializing cropper settings
    this.cropperPlaceHolder = document.getElementById('resizer-demo');
    this.resize = new Croppie(this.cropperPlaceHolder, {
      viewport: { width: this.cropperWidth, height: this.cropperHeight },
      boundary: { height: this.canvasHeight },
      showZoomer: true,
      enableResize: false,
      enableOrientation: true,
      enableZoom: true,
      mouseWheelZoom: 'ctrl'
    });
  }


  /**
   * Determines whether file select on
   * Sets the Base64 of cropped image to the form control
   */
  onFileSelect($event): void {
    this.file = $event.target.files[0];
    const originalType = this.file.type.split('/')[1];

    // validating selected image file
    if (!this.checkForFileType(originalType)) {
      this.control.markAsTouched();
      this.control.setErrors({ 'incorrect-file-image-type': true });
    } else {
      this.preview = URL.createObjectURL($event.target.files[0]);
      this.resize.bind({
        url: this.preview,
      });

      // listing to zoom and reszie cropper eventss
      this.cropperPlaceHolder.addEventListener('update', (ev) => {
        this.resize.result({ type: 'base64', format: originalType }).then((base64: string) => {
          this.control.setValue({
            fileName: this.file.name,
            type: originalType,
            content: base64.split(',')[1]
          });
        });
      });
    }
  }

  /**
   * Checks for file type if is among accepted type [png, jpeg, webp]
   * @returns for file type
   */
  checkForFileType(type: string): boolean {
    return this.validTypes.find(val => val === type) ? true : false;
  }
}
