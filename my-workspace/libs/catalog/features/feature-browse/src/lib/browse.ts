import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { CatalogService } from '@my-workspace/catalog/data-access';
import { ProductCard } from '@my-workspace/catalog/ui-components';

@Component({
  selector: 'lib-browse',
  imports: [ProductCard],
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
