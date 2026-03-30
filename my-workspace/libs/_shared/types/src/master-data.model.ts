export interface MasterDataItem {
  code: string;
  name: string;
  description?: string;
}

export enum AuditEntityType {
  CountryStrategy = 'country-strategy',
}
