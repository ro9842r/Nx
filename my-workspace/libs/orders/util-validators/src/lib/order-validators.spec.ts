import { isValidOrderStatus, isValidOrderTotal } from './order-validators';

describe('order validators', () => {
  it('should validate known statuses', () => {
    expect(isValidOrderStatus('pending')).toBe(true);
    expect(isValidOrderStatus('paid')).toBe(true);
    expect(isValidOrderStatus('shipped')).toBe(true);
    expect(isValidOrderStatus('invalid')).toBe(false);
  });

  it('should validate order totals', () => {
    expect(isValidOrderTotal(10)).toBe(true);
    expect(isValidOrderTotal(0)).toBe(false);
  });
});
