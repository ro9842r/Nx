import { describe, expect, it } from 'vitest';
import { ResultMatrixRepository } from './result-matrix.repository';

describe('ResultMatrixRepository', () => {
  it('returns seeded list', () => {
    const repository = new ResultMatrixRepository();
    const list = repository.list();

    expect(list.length).toBeGreaterThan(0);
    expect(list[0]?.id).toBeTruthy();
  });
});
