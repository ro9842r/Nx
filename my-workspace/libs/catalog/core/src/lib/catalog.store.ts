import { signal } from '@angular/core';
import { Product } from './catalog.models';

export class CatalogStore {
  readonly products = signal<Product[]>([]);
  readonly selectedProduct = signal<Product | null>(null);
}
