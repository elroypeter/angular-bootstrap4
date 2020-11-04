import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { applyMixins } from '../../../composers/component.mixin';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

class BaseClass { }
// tslint:disable-next-line: no-empty-interface
interface BaseClass extends DynamicFormComponent { }
applyMixins(BaseClass, [DynamicFormComponent]);

@Component({
  selector: 'app-reactive-select-input',
  templateUrl: './reactive-select-input.component.html',
  styleUrls: ['./reactive-select-input.component.scss']
})
export class ReactiveSelectInputComponent extends BaseClass implements OnInit, DoCheck {
  iteratableOptions: Array<{ ngValue: any, display: string }> = [];
  selectionList: FormControl = new FormControl();

  constructor() {
    super();
  }

  @Input() fieldId: string | null = null;
  @Input() control: AbstractControl | null = null;
  @Input() options: Array<any> = [];
  @Input() predicate: any;
  @Input() multiSelected: Array<any> = [];
  @Input() single = false;

  ngOnInit(): void {
    super.ngOnInit();
    this.normalizeOptions();

    this.selectionList.valueChanges.subscribe((val: any) => {
      if ((this._checkIfItemExists(val) < 0) && val !== undefined) {
        this.multiSelected.push(val);
        this.control.setValue(this.multiSelected);
      }
    });
  }

  ngDoCheck(): void {
    super.ngDoCheck();
    this.normalizeOptions();
  }

  _checkIfItemExists(item: any): any {
    return this.multiSelected.findIndex((val: any) => this.isEquivalent(val, item));
  }

  _removeItem(item): void {
    const index = this._checkIfItemExists(item);
    if (index >= 0) {
      this.multiSelected.splice(index, 1);
      this.control.setValue(this.multiSelected);
    }
  }

  _findDisplayName(item): string {
    return this.iteratableOptions.find((val: any) => this.isEquivalent(val.ngValue, item)).display;
  }

  isEquivalent(a, b): boolean {
    if (typeof a === 'object' && typeof b === 'object') {
      const aProps = Object.getOwnPropertyNames(a);
      const bProps = Object.getOwnPropertyNames(b);
      if (aProps.length !== bProps.length) {
        return false;
      }
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < aProps.length; i++) {
        const propName = aProps[i];
        if (a[propName] !== b[propName]) {
          return false;
        }
      }
      return true;
    } else {
      return a === b;
    }
  }

  /**
   * Normalizes options to format [{ngValue, display}]
   */
  normalizeOptions(): void {
    this.iteratableOptions = [];
    this.options.forEach((val: any) => {
      this.iteratableOptions.push({
        ngValue: this.predicate.method1(val),
        display: this.predicate.method2(val)
      });
    });
  }
}
