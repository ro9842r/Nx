import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export type CreatePsEngagementNoteForm = FormGroup<{
  title: FormControl<string>;
  countryCode: FormControl<string>;
}>;

export function buildCreatePsEngagementNoteForm(fb: FormBuilder): CreatePsEngagementNoteForm {
  return fb.group({
    title: fb.control('', { nonNullable: true, validators: [Validators.required] }),
    countryCode: fb.control('', { nonNullable: true, validators: [Validators.required] }),
  });
}
