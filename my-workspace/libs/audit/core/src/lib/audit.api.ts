import {
  AuditChange,
  AuditChangeSetSummary,
  AuditEntityReadResult,
  AuditEntitySnapshot,
  AuditEntityType,
  AuditEntityUpdateInput,
  AuditRequestContext,
  AuditUpdateResult,
} from './audit.models';

interface AuditEntityRecord {
  snapshot: AuditEntitySnapshot;
  version: number;
  history: Array<{
    summary: AuditChangeSetSummary;
    changes: AuditChange[];
  }>;
}

const INITIAL_RECORDS = new Map<string, AuditEntityRecord>([
  [
    `${AuditEntityType.CountryStrategy}:64`,
    {
      snapshot: {
        title: 'Country Strategy 64',
        organizationUnit: 'Argentina',
        updatedBy: 'seed-user',
      },
      version: 3,
      history: [
        {
          summary: {
            id: 'cs-64-003',
            changedAt: '2026-03-24T14:20:00.000Z',
            changedBy: 'test.user',
            changeCount: 2,
          },
          changes: [
            { field: 'organizationUnit', before: 'Global', after: 'Argentina' },
            { field: 'description', before: 'Draft', after: 'Published draft' },
          ],
        },
        {
          summary: {
            id: 'cs-64-002',
            changedAt: '2026-03-21T08:45:00.000Z',
            changedBy: 'analyst.user',
            changeCount: 1,
          },
          changes: [
            { field: 'description', before: 'Initial', after: 'Draft' },
          ],
        },
      ],
    },
  ],
]);

export class AuditApi {
  private readonly records = new Map(INITIAL_RECORDS);

  listChangeSets(context: AuditRequestContext): AuditChangeSetSummary[] {
    const record = this.getOrCreateRecord(context);
    return [...record.history.map((item) => item.summary)];
  }

  getChangeSetChanges(
    context: AuditRequestContext,
    changeSetId: string
  ): AuditChange[] {
    const record = this.getOrCreateRecord(context);
    const item = record.history.find((entry) => entry.summary.id === changeSetId);
    return item ? [...item.changes] : [];
  }

  getEntity(context: AuditRequestContext): AuditEntityReadResult {
    const record = this.getOrCreateRecord(context);
    return {
      snapshot: { ...record.snapshot },
      etag: this.toEtag(record.version),
    };
  }

  updateEntity(
    context: AuditRequestContext,
    input: AuditEntityUpdateInput,
    ifMatch: string
  ): AuditUpdateResult {
    const record = this.getOrCreateRecord(context);
    const currentEtag = this.toEtag(record.version);

    if (ifMatch !== currentEtag) {
      return {
        ok: false,
        status: 412,
        message: 'The entity changed since your last read.',
        currentEtag,
      };
    }

    const before = record.snapshot.organizationUnit;
    record.version += 1;
    record.snapshot = {
      ...record.snapshot,
      organizationUnit: input.organizationUnit,
      updatedBy: input.changedBy,
    };

    const summary: AuditChangeSetSummary = {
      id: `${context.entityType}-${context.entityId}-${record.version.toString().padStart(3, '0')}`,
      changedAt: new Date().toISOString(),
      changedBy: input.changedBy,
      changeCount: 1,
    };

    const changes: AuditChange[] = [
      {
        field: 'organizationUnit',
        before,
        after: input.organizationUnit,
      },
    ];

    record.history.unshift({ summary, changes });

    return { ok: true, etag: this.toEtag(record.version) };
  }

  simulateExternalUpdate(context: AuditRequestContext): void {
    const record = this.getOrCreateRecord(context);
    const before = record.snapshot.organizationUnit;
    const after = `${before} (external)`;

    record.version += 1;
    record.snapshot = {
      ...record.snapshot,
      organizationUnit: after,
      updatedBy: 'another.user',
    };

    record.history.unshift({
      summary: {
        id: `${context.entityType}-${context.entityId}-${record.version.toString().padStart(3, '0')}`,
        changedAt: new Date().toISOString(),
        changedBy: 'another.user',
        changeCount: 1,
      },
      changes: [{ field: 'organizationUnit', before, after }],
    });
  }

  private getOrCreateRecord(context: AuditRequestContext): AuditEntityRecord {
    const key = this.keyFor(context);
    const existing = this.records.get(key);
    if (existing) {
      return existing;
    }

    const created: AuditEntityRecord = {
      snapshot: {
        title: `${context.entityType} ${context.entityId}`,
        organizationUnit: 'Unassigned',
        updatedBy: 'system',
      },
      version: 1,
      history: [
        {
          summary: {
            id: `${context.entityType}-${context.entityId}-001`,
            changedAt: new Date().toISOString(),
            changedBy: 'system',
            changeCount: 1,
          },
          changes: [
            {
              field: 'organizationUnit',
              before: '-',
              after: 'Unassigned',
            },
          ],
        },
      ],
    };
    this.records.set(key, created);
    return created;
  }

  private keyFor(context: AuditRequestContext): string {
    return `${context.entityType}:${context.entityId}`;
  }

  private toEtag(version: number): string {
    return `W/"${version}"`;
  }
}
