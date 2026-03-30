export type PsEngagementNoteStatus = 'draft' | 'submitted' | 'approved';

export interface PsCountryEngagementNote {
  id: string;
  title: string;
  country: string;
  status: PsEngagementNoteStatus;
  createdBy: string;
}
