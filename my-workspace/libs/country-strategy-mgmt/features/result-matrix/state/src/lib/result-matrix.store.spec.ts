import { describe, expect, it } from 'vitest';
import { ResultMatrixStore } from './result-matrix.store';

describe('ResultMatrixStore', () => {
  it('starts stale and should refetch', () => {
    const store = new ResultMatrixStore();
    expect(store.isStale()).toBe(true);
    expect(store.shouldRefetch(30_000)).toBe(true);
  });
});
