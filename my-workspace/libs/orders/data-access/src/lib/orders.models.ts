export type OrderStatus = 'pending' | 'paid' | 'shipped';

export interface Order {
  id: string;
  customerName: string;
  total: number;
  status: OrderStatus;
}
