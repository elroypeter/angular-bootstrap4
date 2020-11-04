import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { applyMixins } from '../../../composers/component.mixin';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

class BaseClass {}
// tslint:disable-next-line: no-empty-interface
interface BaseClass extends DynamicFormComponent {}
applyMixins(BaseClass, [DynamicFormComponent]);

@Component({
  selector: 'app-reactive-length-time-input',
  templateUrl: './reactive-length-time-input.component.html',
  styleUrls: ['./reactive-length-time-input.component.scss']
})
export class ReactiveLengthTimeInputComponent extends BaseClass implements OnInit, DoCheck {

  lengthTimeForm: FormGroup = new FormGroup({
    hours: new FormControl(0, [Validators.max(23), Validators.min(0), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    minutes: new FormControl(0, [Validators.max(59), Validators.min(0), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
  });

  @Input() fieldId: string | null = null;
  @Input() control: AbstractControl | null = null;
  @Input() placeHolder: string | null = null;
  @Input() readOnly = false;

  @Input()
  set lengthHour(value: string) {
    this.lengthTimeForm.get('hours').patchValue(value);
  }

  @Input()
  set lengthMinute(value: string) {
    this.lengthTimeForm.get('minutes').patchValue(value);
  }

  ngOnInit(): void{
    super.ngOnInit();
    this.lengthTimeForm.get('hours').valueChanges.subscribe(val => {
      this.control.setValue(this.getLength());
    });

    this.lengthTimeForm.get('minutes').valueChanges.subscribe(val => {
      this.control.setValue(this.getLength());
    });

    this.control.valueChanges.subscribe(val => {
      if (isNaN(val)) {
        this.control.patchValue('');
      }
    });
  }

  ngDoCheck(): void{
    super.ngDoCheck();
  }

  getLength(): number {
    let total = 0;
    if (this.lengthTimeForm.get('hours').value === '') {
      total = 0 + parseInt(this.lengthTimeForm.get('minutes').value, 10);

    } else if (this.lengthTimeForm.get('minutes').value === '') {
      total = (parseInt(this.lengthTimeForm.get('hours').value, 10) * 60) + 0;

    } else {
      total = (parseInt(this.lengthTimeForm.get('hours').value, 10) * 60) + parseInt(this.lengthTimeForm.get('minutes').value, 10);

    }
    return total;
  }
}
