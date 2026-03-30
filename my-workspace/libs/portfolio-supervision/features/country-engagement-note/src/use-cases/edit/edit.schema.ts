import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export type EditPsEngagementNoteForm = FormGroup<{
  title: FormControl<string>;
  countryCode: FormControl<string>;
}>;

export function buildEditPsEngagementNoteForm(fb: FormBuilder): EditPsEngagementNoteForm {
  return fb.group({
    title: fb.control('', { nonNullable: true, validators: [Validators.required] }),
    countryCode: fb.control('', { nonNullable: true, validators: [Validators.required] }),
  });
}
