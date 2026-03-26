import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CatalogService } from '@my-workspace/catalog/data-access';
import { isValidPrice } from '@my-workspace/catalog/util-validators';

@Component({
  selector: 'lib-detail',
  imports: [DecimalPipe],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail {
  private readonly catalog = inject(CatalogService);
  readonly products = this.catalog.store.products;

  constructor() {
    this.catalog.load();
  }

  get firstProductPrice(): number {
    const value = this.products()[0]?.price ?? 0;
    return isValidPrice(value) ? value : 0;
  }
}
