import { Injectable, inject } from '@angular/core';
import {
  CreateResultMatrixInput,
  EditableGovernmentPriority,
  EditablePriorityArea,
  EditableResultMatrix,
  EditableStrategicObjective,
  ResultMatrix,
  UpdateResultMatrixInput,
} from '@oper/rm-types';
import { ResultMatrixRepository } from '@oper/rm-data-access';
import { ResultMatrixStore } from './result-matrix.store';

@Injectable({ providedIn: 'root' })
export class ResultMatrixFacade {
  private static readonly cacheTtlMs = 30_000;
  private readonly repository = inject(ResultMatrixRepository);
  readonly store = new ResultMatrixStore();

  load(force = false): void {
    if (!force && !this.store.shouldRefetch(ResultMatrixFacade.cacheTtlMs)) {
      return;
    }
    this.store.setLoading(true);
    try {
      this.store.setMatrices(this.repository.list());
    } catch {
      this.store.setError('Unable to load result matrices.');
    } finally {
      this.store.setLoading(false);
    }
  }

  loadById(id: string): void {
    this.store.setLoading(true);
    try {
      const matrix = this.repository.getById(id) ?? null;
      this.store.setSelected(matrix);
      if (!matrix) {
        this.store.setError('Result matrix not found.');
      }
    } catch {
      this.store.setError('Unable to load result matrix detail.');
    } finally {
      this.store.setLoading(false);
    }
  }

  create(input: CreateResultMatrixInput): ResultMatrix {
    this.store.setSaving(true);
    try {
      const created = this.repository.create(input);
      this.store.invalidate();
      this.load(true);
      this.store.setSelected(created);
      return created;
    } finally {
      this.store.setSaving(false);
    }
  }

  update(id: string, input: UpdateResultMatrixInput): ResultMatrix | null {
    this.store.setSaving(true);
    try {
      const updated = this.repository.update(id, input) ?? null;
      if (!updated) {
        this.store.setError('Result matrix not found for update.');
        return null;
      }
      this.store.invalidate();
      this.load(true);
      this.store.setSelected(updated);
      return updated;
    } finally {
      this.store.setSaving(false);
    }
  }

  toEditableResultMatrix(matrix: ResultMatrix): EditableResultMatrix {
    return {
      id: matrix.id,
      name: matrix.name,
      countryStrategyId: matrix.countryStrategyId,
      governmentPriorities: matrix.governmentPriorities.map((priority, priorityIndex) =>
        this.toEditablePriority(priority.name, priority.id, priorityIndex, priority.priorityAreas)
      ),
    };
  }

  private toEditablePriority(
    name: string,
    id: string,
    priorityIndex: number,
    areas: ResultMatrix['governmentPriorities'][number]['priorityAreas']
  ): EditableGovernmentPriority {
    return {
      id,
      name,
      clientId: `gp-client-${priorityIndex + 1}`,
      isNew: false,
      isDirty: false,
      priorityAreas: areas.map((area, areaIndex) =>
        this.toEditableArea(area.name, area.id, priorityIndex, areaIndex, area.strategicObjectives)
      ),
    };
  }

  private toEditableArea(
    name: string,
    id: string,
    priorityIndex: number,
    areaIndex: number,
    objectives: ResultMatrix['governmentPriorities'][number]['priorityAreas'][number]['strategicObjectives']
  ): EditablePriorityArea {
    return {
      id,
      name,
      clientId: `pa-client-${priorityIndex + 1}-${areaIndex + 1}`,
      isNew: false,
      isDirty: false,
      strategicObjectives: objectives.map((objective, objectiveIndex) =>
        this.toEditableObjective(objective.title, objective.description, objective.id, priorityIndex, areaIndex, objectiveIndex)
      ),
    };
  }

  private toEditableObjective(
    title: string,
    description: string | undefined,
    id: string,
    priorityIndex: number,
    areaIndex: number,
    objectiveIndex: number
  ): EditableStrategicObjective {
    return {
      id,
      title,
      description,
      clientId: `so-client-${priorityIndex + 1}-${areaIndex + 1}-${objectiveIndex + 1}`,
      isNew: false,
      isDirty: false,
    };
  }
}
