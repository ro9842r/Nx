export type EngagementNoteStatus = 'draft' | 'submitted' | 'approved';

export interface CountryEngagementNote {
  id: string;
  title: string;
  country: string;
  status: EngagementNoteStatus;
  createdBy: string;
}
