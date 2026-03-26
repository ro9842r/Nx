import { signal } from '@angular/core';
import {
  AuditChange,
  AuditChangeSetSummary,
  AuditEntitySnapshot,
  AuditRequestContext,
} from './audit.models';

export class AuditStore {
  readonly context = signal<AuditRequestContext | null>(null);
  readonly changeSets = signal<AuditChangeSetSummary[]>([]);
  readonly selectedChanges = signal<AuditChange[]>([]);
  readonly entitySnapshot = signal<AuditEntitySnapshot | null>(null);
  readonly etag = signal<string | null>(null);
  readonly status = signal<'idle' | 'loading' | 'saving'>('idle');
  readonly conflictMessage = signal<string | null>(null);
  readonly infoMessage = signal<string | null>(null);
}
