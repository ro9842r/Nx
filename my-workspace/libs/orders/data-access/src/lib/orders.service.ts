import { Injectable } from '@angular/core';
import { OrdersApi } from './orders.api';
import { OrdersStore } from './orders.store';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private readonly api = new OrdersApi();
  readonly store = new OrdersStore();

  load(): void {
    this.store.orders.set(this.api.list());
  }
}
