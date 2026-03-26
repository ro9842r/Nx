import { Injectable } from '@angular/core';
import { AuditApi } from './audit.api';
import { AuditEntityUpdateInput, AuditRequestContext } from './audit.models';
import { AuditStore } from './audit.store';

@Injectable({ providedIn: 'root' })
export class AuditService {
  private readonly api = new AuditApi();
  readonly store = new AuditStore();

  load(context: AuditRequestContext): void {
    this.store.status.set('loading');
    this.store.context.set(context);
    this.store.conflictMessage.set(null);
    this.store.infoMessage.set(null);
    this.store.changeSets.set(this.api.listChangeSets(context));
    const entity = this.api.getEntity(context);
    this.store.entitySnapshot.set(entity.snapshot);
    this.store.etag.set(entity.etag);
    this.store.selectedChanges.set([]);
    this.store.status.set('idle');
  }

  loadChanges(changeSetId: string): void {
    const context = this.store.context();
    if (!context) {
      return;
    }
    this.store.selectedChanges.set(this.api.getChangeSetChanges(context, changeSetId));
  }

  updateOrganizationUnit(input: AuditEntityUpdateInput): boolean {
    const context = this.store.context();
    const etag = this.store.etag();
    if (!context || !etag) {
      return false;
    }

    this.store.status.set('saving');
    const result = this.api.updateEntity(context, input, etag);
    if (!result.ok) {
      this.store.conflictMessage.set(
        'This entity was updated by another user. Refresh to sync and try again.'
      );
      this.store.infoMessage.set(null);
      this.store.etag.set(result.currentEtag);
      this.store.status.set('idle');
      return false;
    }

    this.store.conflictMessage.set(null);
    this.store.infoMessage.set('Update saved successfully.');
    this.store.etag.set(result.etag);
    this.load(context);
    return true;
  }

  refresh(): void {
    const context = this.store.context();
    if (context) {
      this.load(context);
    }
  }

  simulateExternalUpdate(): void {
    const context = this.store.context();
    if (!context) {
      return;
    }

    this.api.simulateExternalUpdate(context);
    this.store.infoMessage.set(
      'External update simulated. Your local ETag is now stale.'
    );
  }
}
