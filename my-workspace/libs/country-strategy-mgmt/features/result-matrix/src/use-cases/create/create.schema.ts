import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

export type StrategicObjectiveForm = FormGroup<{
  title: FormControl<string>;
  description: FormControl<string>;
}>;

export type PriorityAreaForm = FormGroup<{
  name: FormControl<string>;
  strategicObjectives: FormArray<StrategicObjectiveForm>;
}>;

export type GovernmentPriorityForm = FormGroup<{
  name: FormControl<string>;
  priorityAreas: FormArray<PriorityAreaForm>;
}>;

export type CreateResultMatrixForm = FormGroup<{
  name: FormControl<string>;
  countryStrategyId: FormControl<string>;
  governmentPriorities: FormArray<GovernmentPriorityForm>;
}>;

export function buildCreateResultMatrixForm(fb: FormBuilder): CreateResultMatrixForm {
  return fb.group({
    name: fb.control('', { nonNullable: true, validators: [Validators.required] }),
    countryStrategyId: fb.control('64', { nonNullable: true, validators: [Validators.required] }),
    governmentPriorities: fb.array([buildGovernmentPriorityGroup(fb)], { validators: [requireNonEmptyArray] }),
  });
}

export function buildGovernmentPriorityGroup(fb: FormBuilder, name = ''): GovernmentPriorityForm {
  return fb.group({
    name: fb.control(name, { nonNullable: true, validators: [Validators.required] }),
    priorityAreas: fb.array([buildPriorityAreaGroup(fb)], { validators: [requireNonEmptyArray] }),
  });
}

export function buildPriorityAreaGroup(fb: FormBuilder, name = ''): PriorityAreaForm {
  return fb.group({
    name: fb.control(name, { nonNullable: true, validators: [Validators.required] }),
    strategicObjectives: fb.array([buildStrategicObjectiveGroup(fb)], { validators: [requireNonEmptyArray] }),
  });
}

export function buildStrategicObjectiveGroup(
  fb: FormBuilder,
  title = '',
  description = ''
): StrategicObjectiveForm {
  return fb.group({
    title: fb.control(title, { nonNullable: true, validators: [Validators.required] }),
    description: fb.control(description, { nonNullable: true }),
  });
}

export function requireNonEmptyArray(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (Array.isArray(value) && value.length > 0) {
    return null;
  }
  return { requiredCollection: true };
}
