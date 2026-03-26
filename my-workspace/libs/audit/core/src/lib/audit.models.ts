import { AuditEntityType } from '@my-workspace/shared/interfaces';
export { AuditEntityType };

export interface AuditRequestContext {
  entityType: AuditEntityType;
  entityId: string;
}

export interface AuditChangeSetSummary {
  id: string;
  changedAt: string;
  changedBy: string;
  changeCount: number;
}

export interface AuditChange {
  field: string;
  before: string;
  after: string;
}

export interface AuditEntitySnapshot {
  title: string;
  organizationUnit: string;
  updatedBy: string;
}

export interface AuditEntityReadResult {
  snapshot: AuditEntitySnapshot;
  etag: string;
}

export interface AuditEntityUpdateInput {
  organizationUnit: string;
  changedBy: string;
}

export type AuditUpdateResult =
  | { ok: true; etag: string }
  | { ok: false; status: 412; message: string; currentEtag: string };
