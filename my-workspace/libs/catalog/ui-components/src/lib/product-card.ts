import { Component } from '@angular/core';
import { input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Product } from '@my-workspace/catalog/core';
import { ProductBadge } from './product-badge';

@Component({
  selector: 'lib-product-card',
  imports: [ProductBadge, DecimalPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly product = input.required<Product>();
}
