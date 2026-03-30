import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export type EditStrategyForm = FormGroup<{
  title: FormControl<string>;
  owner: FormControl<string>;
  countryCode: FormControl<string>;
  status: FormControl<string>;
}>;

export function buildEditStrategyForm(fb: FormBuilder): EditStrategyForm {
  return fb.group({
    title: fb.control('', { nonNullable: true, validators: [Validators.required] }),
    owner: fb.control('', { nonNullable: true, validators: [Validators.required] }),
    countryCode: fb.control('', { nonNullable: true, validators: [Validators.required] }),
    status: fb.control('draft', { nonNullable: true }),
  });
}
