import { NewOrderInput, Order } from './orders.models';

const ORDERS: Order[] = [
  { id: 'ord-1001', customerName: 'Alice', total: 120, status: 'pending' },
  { id: 'ord-1002', customerName: 'Bruno', total: 89.9, status: 'paid' },
];

export class OrdersApi {
  list(): Order[] {
    return [...ORDERS];
  }

  create(input: NewOrderInput): Order {
    const next: Order = {
      id: `ord-${1000 + ORDERS.length + 1}`,
      customerName: input.customerName,
      total: input.total,
      status: input.status ?? 'pending',
    };
    ORDERS.push(next);
    return next;
  }
}
