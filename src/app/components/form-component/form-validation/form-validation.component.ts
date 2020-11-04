import { Component, Input, OnChanges } from '@angular/core';
import {
  REQUIRED_FIELD_MESSAGE,
  IMAGE_FILE_TYPE_MESSAGE,
  UPLOAD_FILE_TYPE_MESSAGE,
  PASSWORD_NOT_MATCHING
} from '../../../constants/validation-messages/list';
import { PATTERNS_LIST } from '../../../constants/validation-patterns/list';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss']
})
export class FormValidationComponent implements OnChanges {
  @Input() validationErrors: object | null = null;
  errorMessage: string | null = null;

  constructor() { }

  ngOnChanges(): void {
    this.errorMessage = this.getErrorMessage();
  }

  /**
   * Gets error message
   * @returns error message
   */
  getErrorMessage(): string | null {
    const errors: any = this.validationErrors;
    if (errors) {
      if (errors.required) {
        return REQUIRED_FIELD_MESSAGE;
      }

      if (errors.pattern) {
        return this.getPatternErrorMessage(errors.pattern.requiredPattern);
      }

      if (errors['incorrect-file-image-type']) {
        return IMAGE_FILE_TYPE_MESSAGE;
      }

      if (errors['incorrect-file-upload-type']) {
        return UPLOAD_FILE_TYPE_MESSAGE;
      }

      if (errors.password_deos_not_match) {
        return PASSWORD_NOT_MATCHING;
      }
    }
    return null;
  }

  /**
   * Gets pattern error message
   * @returns pattern error message
   */
  getPatternErrorMessage(requiredPattern: string): string | null {
    return PATTERNS_LIST.filter(patterns => patterns.PATTERN === requiredPattern)[0].MESSAGE;
  }
}
