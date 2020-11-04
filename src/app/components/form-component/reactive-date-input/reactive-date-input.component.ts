import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { applyMixins } from '../../../composers/component.mixin';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { SettingsService } from 'src/app/services/settings/setting.service';

class BaseClass { }
// tslint:disable-next-line: no-empty-interface
interface BaseClass extends DynamicFormComponent { }
applyMixins(BaseClass, [DynamicFormComponent]);

@Component({
  selector: 'app-reactive-date-input',
  templateUrl: './reactive-date-input.component.html',
  styleUrls: ['./reactive-date-input.component.scss']
})
export class ReactiveDateInputComponent extends BaseClass implements OnInit {

  @Input() singleDate = true;
  @Input() minDate: Date | null = null;
  @Input() fieldId: string | null = null;
  @Input() control: AbstractControl | null = null;

  constructor(public settings: SettingsService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngDoCheck(): void {
    super.ngDoCheck();
  }

  /**
   * Determines whether pick date on
   */
  onPickDate($event: any): void {
    if ($event !== null) {
      if (!Array.isArray($event)) {
        this.control.setValue(this.settings.formatDate($event));
      }
    }
  }
}
