import { Component } from '@angular/core';
import { input } from '@angular/core';

@Component({
  selector: 'lib-product-badge',
  imports: [],
  templateUrl: './product-badge.html',
  styleUrl: './product-badge.scss',
})
export class ProductBadge {
  readonly featured = input(false);
}
