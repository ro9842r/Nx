import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CatalogService } from '@my-workspace/catalog';
import { isValidPrice } from '@my-workspace/catalog/utils';
import { AuditEntityType } from '@my-workspace/shared/interfaces';

@Component({
  selector: 'lib-detail',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail {
  private readonly catalog = inject(CatalogService);
  private readonly route = inject(ActivatedRoute);
  readonly selectedProduct = this.catalog.store.selectedProduct;
  readonly auditEntityType = AuditEntityType.CatalogProduct;
  selectedProductId = '';

  constructor() {
    this.selectedProductId = this.route.snapshot.paramMap.get('id') ?? '';
    this.catalog.loadById(this.selectedProductId);
  }

  get selectedProductPrice(): number {
    const value = this.selectedProduct()?.price ?? 0;
    return isValidPrice(value) ? value : 0;
  }
}
