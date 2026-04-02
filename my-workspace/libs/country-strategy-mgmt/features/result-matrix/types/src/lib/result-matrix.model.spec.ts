import { describe, expect, it } from 'vitest';
import { CreateResultMatrixInput } from './result-matrix.model';

describe('result-matrix types', () => {
  it('keeps 1:N hierarchy shape for input payload', () => {
    const payload: CreateResultMatrixInput = {
      name: 'Demo',
      countryStrategyId: '64',
      governmentPriorities: [
        {
          name: 'Priority A',
          priorityAreas: [
            {
              name: 'Area A1',
              strategicObjectives: [{ title: 'Objective A1.1' }],
            },
          ],
        },
      ],
    };

    expect(payload.governmentPriorities[0].priorityAreas).toHaveLength(1);
    expect(payload.governmentPriorities[0].priorityAreas[0].strategicObjectives).toHaveLength(1);
  });
});
