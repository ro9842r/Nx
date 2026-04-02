import { FormArray, FormBuilder } from '@angular/forms';
import {
  buildGovernmentPriorityGroup,
  buildPriorityAreaGroup,
  buildStrategicObjectiveGroup,
  CreateResultMatrixForm,
  GovernmentPriorityForm,
  PriorityAreaForm,
  StrategicObjectiveForm,
} from '../create/create.schema';

export type EditResultMatrixForm = CreateResultMatrixForm;

export interface EditResultMatrixSeed {
  name: string;
  countryStrategyId: string;
  governmentPriorities: Array<{
    name: string;
    priorityAreas: Array<{
      name: string;
      strategicObjectives: Array<{
        title: string;
        description?: string;
      }>;
    }>;
  }>;
}

export function buildEditResultMatrixForm(fb: FormBuilder, seed: EditResultMatrixSeed): EditResultMatrixForm {
  return fb.group({
    name: fb.control(seed.name, { nonNullable: true }),
    countryStrategyId: fb.control(seed.countryStrategyId, { nonNullable: true }),
    governmentPriorities: fb.array(
      seed.governmentPriorities.length > 0
        ? seed.governmentPriorities.map((priority) => toPriorityGroup(fb, priority))
        : [buildGovernmentPriorityGroup(fb)],
    ),
  });
}

function toPriorityGroup(
  fb: FormBuilder,
  priority: EditResultMatrixSeed['governmentPriorities'][number]
): GovernmentPriorityForm {
  const group = buildGovernmentPriorityGroup(fb, priority.name);
  const areas = group.controls.priorityAreas;
  areas.clear();
  const values = priority.priorityAreas.length > 0 ? priority.priorityAreas : [{ name: '', strategicObjectives: [{ title: '', description: '' }] }];
  values.forEach((area) => areas.push(toAreaGroup(fb, area)));
  return group;
}

function toAreaGroup(
  fb: FormBuilder,
  area: EditResultMatrixSeed['governmentPriorities'][number]['priorityAreas'][number]
): PriorityAreaForm {
  const group = buildPriorityAreaGroup(fb, area.name);
  const objectives: FormArray<StrategicObjectiveForm> = group.controls.strategicObjectives;
  objectives.clear();
  const values = area.strategicObjectives.length > 0 ? area.strategicObjectives : [{ title: '', description: '' }];
  values.forEach((objective) => objectives.push(buildStrategicObjectiveGroup(fb, objective.title, objective.description ?? '')));
  return group;
}
