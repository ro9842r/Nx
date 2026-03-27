import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { OrdersService } from '@my-workspace/orders/core';
import { AuthService } from '@my-workspace/users/core';
import { CatalogService } from '@my-workspace/catalog/core';
import { t } from '@my-workspace/shared/i18n';

@Component({
  selector: 'lib-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  private readonly orders = inject(OrdersService);
  private readonly users = inject(AuthService);
  private readonly catalog = inject(CatalogService);
  readonly title = t('dashboard');

  constructor() {
    this.orders.load();
    this.catalog.load();
    this.users.login('dashboard@demo.com');
  }

  get stats(): string {
    return `orders: ${this.orders.store.orders().length}, products: ${this.catalog.store.products().length}, user: ${this.users.store.currentUser()?.email ?? 'none'}`;
  }
}
