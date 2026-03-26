import { computed, Signal } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { Order } from './orders.models';

interface OrdersState {
  orders: Order[];
  loadedAt: number | null;
  isStale: boolean;
}

export class OrdersStore {
  private readonly state = signalState<OrdersState>({
    orders: [],
    loadedAt: null,
    isStale: true,
  });

  readonly orders: Signal<Order[]> = computed(() => this.state.orders());
  readonly loadedAt: Signal<number | null> = computed(() => this.state.loadedAt());
  readonly isStale: Signal<boolean> = computed(() => this.state.isStale());

  setOrders(orders: Order[]): void {
    patchState(this.state, {
      orders,
      loadedAt: Date.now(),
      isStale: false,
    });
  }

  invalidate(): void {
    patchState(this.state, { isStale: true });
  }

  shouldRefetch(maxAgeMs: number): boolean {
    const loadedAt = this.loadedAt();
    if (this.isStale() || loadedAt === null) {
      return true;
    }

    return Date.now() - loadedAt > maxAgeMs;
  }
}
