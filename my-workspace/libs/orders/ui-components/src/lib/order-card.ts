import { Component } from '@angular/core';
import { input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Order } from '@my-workspace/orders/core';
import { OrderStatusBadge } from './order-status-badge';

@Component({
  selector: 'lib-order-card',
  imports: [OrderStatusBadge, DecimalPipe],
  templateUrl: './order-card.html',
  styleUrl: './order-card.scss',
})
export class OrderCard {
  readonly order = input.required<Order>();
}
