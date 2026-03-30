import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export type CreateStrategyForm = FormGroup<{
  countryCode: FormControl<string>;
  startYear: FormControl<number | null>;
  endYear: FormControl<number | null>;
}>;

export function buildCreateStrategyForm(fb: FormBuilder): CreateStrategyForm {
  return fb.group({
    countryCode: fb.control('', { nonNullable: true, validators: [Validators.required] }),
    startYear: fb.control<number | null>(null, [Validators.required]),
    endYear: fb.control<number | null>(null, [Validators.required]),
  });
}
