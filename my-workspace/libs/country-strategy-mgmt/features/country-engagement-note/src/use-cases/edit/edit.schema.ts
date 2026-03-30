import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export type EditEngagementNoteForm = FormGroup<{
  title: FormControl<string>;
  countryCode: FormControl<string>;
}>;

export function buildEditEngagementNoteForm(fb: FormBuilder): EditEngagementNoteForm {
  return fb.group({
    title: fb.control('', { nonNullable: true, validators: [Validators.required] }),
    countryCode: fb.control('', { nonNullable: true, validators: [Validators.required] }),
  });
}
