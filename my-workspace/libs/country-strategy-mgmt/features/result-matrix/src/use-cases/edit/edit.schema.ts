import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export type EditResultMatrixForm = FormGroup<{
  name: FormControl<string>;
  countryStrategyId: FormControl<string>;
}>;

export function buildEditResultMatrixForm(fb: FormBuilder): EditResultMatrixForm {
  return fb.group({
    name: fb.control('', { nonNullable: true, validators: [Validators.required] }),
    countryStrategyId: fb.control('', { nonNullable: true, validators: [Validators.required] }),
  });
}
