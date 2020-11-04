import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { COLORS } from '../../../constants/colors/colors';
import { AbstractControl } from '@angular/forms';
import { applyMixins } from '../../../composers/component.mixin';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

class BaseClass { }
// tslint:disable-next-line: no-empty-interface
interface BaseClass extends DynamicFormComponent { }
applyMixins(BaseClass, [DynamicFormComponent]);

@Component({
  selector: 'app-reactive-color-picker',
  templateUrl: './reactive-color-picker.component.html',
  styleUrls: ['./reactive-color-picker.component.scss']
})
export class ReactiveColorPickerComponent extends BaseClass implements OnInit, DoCheck {
  availableColors: Array<string> = COLORS;
  palette: HTMLElement;
  openPaletteBtn: HTMLElement;
  bodyContainer: Element;
  isPaletteOpen = false;

  constructor() {
    super();
  }

  @Input() fieldId: string | null = null;
  @Input() control: AbstractControl | null = null;

  ngOnInit(): void {
    super.ngOnInit();
    this.palette = document.getElementById('color-picker');
    this.bodyContainer = document.getElementsByTagName('BODY')[0];
    this.openPaletteBtn = document.getElementById('open-palette');

    this.closePaletteOnClickOutside();
  }

  ngDoCheck(): void {
    super.ngDoCheck();
  }

  /**
   * Opens palette
   */
  openPalette(): void {
    this.isPaletteOpen = true;
  }

  /**
   * Closes palette
   */
  closePalette(): void {
    this.isPaletteOpen = false;
  }

  /**
   * Picks color
   */
  pickColor(color: string): void {
    this.control.setValue(color);
  }

  /**
   * Closes palette on click outside
   */
  closePaletteOnClickOutside(): void {
    this.bodyContainer.addEventListener('click', (event: any) => {
      const isClickInside = this.palette.contains(event.target);
      const isOpeningPalette = this.openPaletteBtn.contains(event.target);

      if (!isClickInside && !isOpeningPalette) {
        this.closePalette();
      }
    });
  }
}
