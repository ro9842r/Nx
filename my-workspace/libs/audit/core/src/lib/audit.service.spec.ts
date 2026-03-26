import { AuditEntityType } from './audit.models';
import { AuditService } from './audit.service';

describe('AuditService', () => {
  it('loads data and updates organization unit', () => {
    const service = new AuditService();

    service.load({
      entityType: AuditEntityType.CountryStrategy,
      entityId: '64',
    });

    const initialCount = service.store.changeSets().length;
    const saved = service.updateOrganizationUnit({
      organizationUnit: 'Costa Rica',
      changedBy: 'test.user',
    });

    expect(saved).toBe(true);
    expect(service.store.changeSets().length).toBeGreaterThanOrEqual(initialCount);
  });
});
