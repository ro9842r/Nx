import { Injectable } from '@angular/core';
import {
  CreateResultMatrixInput,
  GovernmentPriorityInput,
  ResultMatrix,
  ResultMatrixSummary,
  UpdateResultMatrixInput,
} from '@oper/rm-types';

const MATRICES: ResultMatrix[] = [
  {
    id: 'rm-101',
    name: 'Brazil 2026 Result Matrix',
    countryStrategyId: '64',
    status: 'draft',
    updatedAt: new Date().toISOString(),
    governmentPriorities: [
      {
        id: 'gp-101',
        name: 'Economic Recovery',
        order: 1,
        priorityAreas: [
          {
            id: 'pa-101',
            name: 'SME Financing',
            order: 1,
            strategicObjectives: [
              {
                id: 'so-101',
                title: 'Increase approved SME credits by 20%',
                description: 'Measure approvals on an annual basis.',
                order: 1,
              },
              {
                id: 'so-102',
                title: 'Reduce average response time to 10 days',
                order: 2,
              },
            ],
          },
        ],
      },
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class ResultMatrixRepository {
  list(): ResultMatrixSummary[] {
    return MATRICES.map(({ id, name, countryStrategyId, status, updatedAt }) => ({
      id,
      name,
      countryStrategyId,
      status,
      updatedAt,
    }));
  }

  getById(id: string): ResultMatrix | undefined {
    const matrix = MATRICES.find((item) => item.id === id);
    if (!matrix) {
      return undefined;
    }
    return this.clone(matrix);
  }

  create(input: CreateResultMatrixInput): ResultMatrix {
    const created: ResultMatrix = {
      id: this.nextId('rm'),
      name: input.name,
      countryStrategyId: input.countryStrategyId,
      status: 'draft',
      updatedAt: new Date().toISOString(),
      governmentPriorities: this.buildHierarchy(input.governmentPriorities),
    };
    MATRICES.unshift(created);
    return this.clone(created);
  }

  update(id: string, input: UpdateResultMatrixInput): ResultMatrix | undefined {
    const current = MATRICES.find((item) => item.id === id);
    if (!current) {
      return undefined;
    }
    current.name = input.name;
    current.countryStrategyId = input.countryStrategyId;
    current.governmentPriorities = this.buildHierarchy(input.governmentPriorities);
    current.updatedAt = new Date().toISOString();
    return this.clone(current);
  }

  private buildHierarchy(priorities: GovernmentPriorityInput[]): ResultMatrix['governmentPriorities'] {
    return priorities.map((priority, priorityIndex) => ({
      id: this.nextId('gp'),
      name: priority.name,
      order: priorityIndex + 1,
      priorityAreas: priority.priorityAreas.map((area, areaIndex) => ({
        id: this.nextId('pa'),
        name: area.name,
        order: areaIndex + 1,
        strategicObjectives: area.strategicObjectives.map((objective, objectiveIndex) => ({
          id: this.nextId('so'),
          title: objective.title,
          description: objective.description,
          order: objectiveIndex + 1,
        })),
      })),
    }));
  }

  private nextId(prefix: string): string {
    const unique = Math.floor(Math.random() * 1_000_000)
      .toString()
      .padStart(6, '0');
    return `${prefix}-${unique}`;
  }

  private clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
  }
}
