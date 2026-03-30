import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export type CreateCpdForm = FormGroup<{
  countryCode: FormControl<string>;
  year: FormControl<number | null>;
}>;

export function buildCreateCpdForm(fb: FormBuilder): CreateCpdForm {
  return fb.group({
    countryCode: fb.control('', { nonNullable: true, validators: [Validators.required] }),
    year: fb.control<number | null>(null, [Validators.required]),
  });
}
