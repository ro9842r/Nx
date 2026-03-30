import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export type CreateResultMatrixForm = FormGroup<{
  name: FormControl<string>;
  countryStrategyId: FormControl<string>;
}>;

export function buildCreateResultMatrixForm(fb: FormBuilder): CreateResultMatrixForm {
  return fb.group({
    name: fb.control('', { nonNullable: true, validators: [Validators.required] }),
    countryStrategyId: fb.control('', { nonNullable: true, validators: [Validators.required] }),
  });
}
