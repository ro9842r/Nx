import { Injectable } from '@angular/core';
import { OrdersApi } from './orders.api';
import { NewOrderInput } from './orders.models';
import { OrdersStore } from './orders.store';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private readonly api = new OrdersApi();
  readonly store = new OrdersStore();
  private static readonly cacheTtlMs = 30_000;

  load(force = false): void {
    if (!force && !this.store.shouldRefetch(OrdersService.cacheTtlMs)) {
      return;
    }

    this.store.setOrders(this.api.list());
  }

  create(input: NewOrderInput): void {
    this.api.create(input);
    // Mutation invalidates the cache and forces immediate refresh.
    this.store.invalidate();
    this.load(true);
  }
}
