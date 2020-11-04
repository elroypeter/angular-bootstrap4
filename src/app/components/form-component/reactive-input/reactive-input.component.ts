import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { applyMixins } from '../../../composers/component.mixin';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

class BaseClass {}
// tslint:disable-next-line: no-empty-interface
interface BaseClass extends DynamicFormComponent {}
applyMixins(BaseClass, [DynamicFormComponent]);

@Component({
  selector: 'app-reactive-input',
  templateUrl: './reactive-input.component.html',
  styleUrls: ['./reactive-input.component.scss']
})
export class ReactiveInputComponent extends BaseClass implements OnInit, DoCheck {
  @Input() fieldId: string | null = null;
  @Input() control: AbstractControl | null = null;
  @Input() fieldType = '';
  @Input() placeHolder: string | null = null;
  @Input() disabled = false;

  ngOnInit(): void{
    super.ngOnInit();
  }

  ngDoCheck(): void{
    super.ngDoCheck();
  }

}
