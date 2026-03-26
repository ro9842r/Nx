import { signal } from '@angular/core';
import { Order } from './orders.models';

export class OrdersStore {
  readonly orders = signal<Order[]>([]);
}
