import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { applyMixins } from '../../../composers/component.mixin';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

class BaseClass { }
// tslint:disable-next-line: no-empty-interface
interface BaseClass extends DynamicFormComponent { }
applyMixins(BaseClass, [DynamicFormComponent]);

@Component({
  selector: 'app-reactive-textarea',
  templateUrl: './reactive-textarea.component.html',
  styleUrls: ['./reactive-textarea.component.scss']
})
export class ReactiveTextareaComponent extends BaseClass implements OnInit, DoCheck {
  constructor() {
    super();
  }

  @Input() fieldId: string | null = null;
  @Input() control: AbstractControl | null = null;
  @Input() cols: number;
  @Input() rows: number;

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngDoCheck(): void {
    super.ngDoCheck();
  }
}
