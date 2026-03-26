export interface ApiResult<T> {
  data: T;
  success: boolean;
}

export enum AuditEntityType {
  CountryStrategy = 'country-strategy',
  CatalogProduct = 'catalog-product',
}
