import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { LABEL_LIST } from '../../../constants/labels/form-label-list';

@Component({
  selector: 'app-name',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, DoCheck {
  fieldId: string | null = null;
  control: AbstractControl | null = null;

  label: string = null;
  validationErrors: object = null;

  constructor() { }

  ngOnInit(): void {
    this.label = LABEL_LIST[this.fieldId] ? LABEL_LIST[this.fieldId] : '';
  }

  ngDoCheck(): void {
    this.validationErrors = this.control.touched && this.control.invalid ? this.control.errors : null;
  }
}
