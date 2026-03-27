import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '@my-workspace/catalog/core';
import { ProductCard } from '@my-workspace/catalog/ui/product-card';

@Component({
  selector: 'lib-browse',
  imports: [ProductCard, RouterLink],
  templateUrl: './browse.html',
  styleUrl: './browse.scss',
})
export class Browse {
  private readonly catalog = inject(CatalogService);
  readonly products = this.catalog.store.products;

  constructor() {
    this.catalog.load();
  }
}
