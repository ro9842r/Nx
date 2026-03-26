import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AuditEntityType,
  AuditRequestContext,
  AuditService,
} from '@my-workspace/audit/core';

@Component({
  selector: 'lib-audit-page',
  imports: [DatePipe, FormsModule],
  templateUrl: './audit-page.html',
  styleUrl: './audit-page.scss',
})
export class AuditPage {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(AuditService);

  readonly snapshot = this.service.store.entitySnapshot;
  readonly changeSets = this.service.store.changeSets;
  readonly selectedChanges = this.service.store.selectedChanges;
  readonly conflictMessage = this.service.store.conflictMessage;
  readonly infoMessage = this.service.store.infoMessage;
  readonly etag = this.service.store.etag;
  readonly status = this.service.store.status;

  organizationUnitInput = '';
  changedByInput = 'test.user';

  constructor() {
    this.loadFromRoute();
  }

  onChangeSetClick(changeSetId: string): void {
    this.service.loadChanges(changeSetId);
  }

  saveOrganizationUnit(): void {
    if (!this.organizationUnitInput.trim()) {
      return;
    }

    const saved = this.service.updateOrganizationUnit({
      organizationUnit: this.organizationUnitInput.trim(),
      changedBy: this.changedByInput.trim() || 'test.user',
    });

    if (saved) {
      this.organizationUnitInput = '';
    }
  }

  refreshAfterConflict(): void {
    this.service.refresh();
  }

  simulateExternalUpdate(): void {
    this.service.simulateExternalUpdate();
  }

  private loadFromRoute(): void {
    const rawEntityType = this.route.snapshot.paramMap.get('entityType') ?? '';
    const entityId = this.route.snapshot.paramMap.get('entityId') ?? '';
    if (!entityId) {
      return;
    }

    const context: AuditRequestContext = {
      entityType: this.toEntityType(rawEntityType),
      entityId,
    };
    this.service.load(context);
  }

  private toEntityType(raw: string): AuditEntityType {
    const values = Object.values(AuditEntityType) as string[];
    return values.includes(raw) ? (raw as AuditEntityType) : AuditEntityType.CountryStrategy;
  }
}
