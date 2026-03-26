import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { OrderCard } from '@my-workspace/orders/ui-components';
import { OrdersService } from '@my-workspace/orders-core';

@Component({
  selector: 'lib-order-list',
  imports: [OrderCard],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList {
  private readonly service = inject(OrdersService);
  readonly orders = this.service.store.orders;

  constructor() {
    this.service.load();
  }
}
