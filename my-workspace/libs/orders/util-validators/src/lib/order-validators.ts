type OrderStatus = 'pending' | 'paid' | 'shipped';

const VALID_STATUSES: OrderStatus[] = ['pending', 'paid', 'shipped'];

export const isValidOrderStatus = (status: string): status is OrderStatus =>
  VALID_STATUSES.includes(status as OrderStatus);

export const isValidOrderTotal = (total: number): boolean => total > 0;
