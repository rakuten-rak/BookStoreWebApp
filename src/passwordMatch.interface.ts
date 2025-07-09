import { Directive } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

/**
 * Validate that two input have the same value.
 */
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');
  return password && passwordConfirm && password.value === passwordConfirm.value
    ? null
    : { passwordConfirm: false };
};

@Directive({
  selector: '[appPasswordConfirm]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IdentityRevealedValidatorDirective,
      multi: true,
    },
  ],
})
export class IdentityRevealedValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return passwordMatchValidator(control);
  }
}
