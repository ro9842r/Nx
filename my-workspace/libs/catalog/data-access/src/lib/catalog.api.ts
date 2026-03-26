import { Product } from './catalog.models';

const PRODUCTS: Product[] = [
  { id: 'prd-100', name: 'Notebook', price: 3500, featured: true },
  { id: 'prd-200', name: 'Mouse', price: 120 },
];

export class CatalogApi {
  list(): Product[] {
    return [...PRODUCTS];
  }
}
