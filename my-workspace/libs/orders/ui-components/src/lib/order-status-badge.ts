import { Component } from '@angular/core';
import { input } from '@angular/core';
import { OrderStatus } from '@my-workspace/orders/data-access';

@Component({
  selector: 'lib-order-status-badge',
  imports: [],
  templateUrl: './order-status-badge.html',
  styleUrl: './order-status-badge.scss',
})
export class OrderStatusBadge {
  readonly status = input<OrderStatus>('pending');
}
