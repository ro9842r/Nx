import { AbstractControl, FormGroup } from '@angular/forms';

export function getControlError(
  control: AbstractControl,
  errorKey: string
): string | null {
  return control.hasError(errorKey)
    ? (control.getError(errorKey) as string)
    : null;
}

export function markAllAsTouched(form: FormGroup): void {
  form.markAllAsTouched();
}

export function resetFormSafely(form: FormGroup): void {
  form.reset();
  form.markAsUntouched();
  form.markAsPristine();
}
