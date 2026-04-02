import { FormBuilder } from '@angular/forms';
import { describe, expect, it } from 'vitest';
import { buildCreateResultMatrixForm } from './create.schema';

describe('buildCreateResultMatrixForm', () => {
  it('creates default 1:N hierarchy and validates required fields', () => {
    const form = buildCreateResultMatrixForm(new FormBuilder());

    expect(form.controls.governmentPriorities.length).toBe(1);
    expect(form.controls.governmentPriorities.at(0).controls.priorityAreas.length).toBe(1);
    expect(
      form.controls.governmentPriorities
        .at(0)
        .controls.priorityAreas.at(0)
        .controls.strategicObjectives.length
    ).toBe(1);

    expect(form.valid).toBe(false);
    form.controls.name.setValue('Matrix Demo');
    form.controls.governmentPriorities.at(0).controls.name.setValue('Priority');
    form.controls.governmentPriorities
      .at(0)
      .controls.priorityAreas.at(0)
      .controls.name.setValue('Area');
    form.controls.governmentPriorities
      .at(0)
      .controls.priorityAreas.at(0)
      .controls.strategicObjectives.at(0)
      .controls.title.setValue('Objective');

    expect(form.valid).toBe(true);
  });
});
