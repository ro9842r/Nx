import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { OrdersService } from '@my-workspace/orders-core';
import { CatalogService } from '@my-workspace/catalog-core';
import { t } from '@my-workspace/shared/i18n';

@Component({
  selector: 'lib-checkout-page',
  imports: [],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.scss',
})
export class CheckoutPage {
  private readonly ordersService = inject(OrdersService);
  private readonly catalogService = inject(CatalogService);
  readonly title = t('checkout');

  constructor() {
    this.ordersService.load();
    this.catalogService.load();
  }

  get counts(): string {
    return `${this.ordersService.store.orders().length} orders / ${this.catalogService.store.products().length} products`;
  }
}
