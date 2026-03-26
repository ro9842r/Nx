import { Injectable } from '@angular/core';
import { CatalogApi } from './catalog.api';
import { CatalogStore } from './catalog.store';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly api = new CatalogApi();
  readonly store = new CatalogStore();

  load(): void {
    this.store.products.set(this.api.list());
  }

  loadById(id: string): void {
    const { product } = this.api.getById(id);
    this.store.selectedProduct.set(product ?? null);
  }
}
