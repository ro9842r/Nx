import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { OrdersService } from '@my-workspace/orders/data-access';
import { isValidOrderTotal } from '@my-workspace/orders/util-validators';

@Component({
  selector: 'lib-checkout',
  imports: [CurrencyPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private readonly service = inject(OrdersService);
  readonly orders = this.service.store.orders;

  constructor() {
    this.service.load();
  }

  get total(): number {
    const value = this.orders().reduce((sum, order) => sum + order.total, 0);
    return isValidOrderTotal(value) ? value : 0;
  }
}
