import { Order } from './orders.models';

const ORDERS: Order[] = [
  { id: 'ord-1001', customerName: 'Alice', total: 120, status: 'pending' },
  { id: 'ord-1002', customerName: 'Bruno', total: 89.9, status: 'paid' },
];

export class OrdersApi {
  list(): Order[] {
    return [...ORDERS];
  }
}
