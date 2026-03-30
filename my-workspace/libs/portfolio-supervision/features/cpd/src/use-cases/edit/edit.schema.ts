import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export type EditCpdForm = FormGroup<{
  countryCode: FormControl<string>;
  year: FormControl<number | null>;
}>;

export function buildEditCpdForm(fb: FormBuilder): EditCpdForm {
  return fb.group({
    countryCode: fb.control('', { nonNullable: true, validators: [Validators.required] }),
    year: fb.control<number | null>(null, [Validators.required]),
  });
}
