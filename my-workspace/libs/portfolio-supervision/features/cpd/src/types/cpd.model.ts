export type CpdStatus = 'draft' | 'under-review' | 'approved';

export interface CountryPageDocument {
  id: string;
  title: string;
  country: string;
  status: CpdStatus;
  createdBy: string;
}
