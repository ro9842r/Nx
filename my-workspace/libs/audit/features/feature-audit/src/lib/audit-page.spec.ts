import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { AuditPage } from './audit-page';

describe('AuditPage', () => {
  let component: AuditPage;
  let fixture: ComponentFixture<AuditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                entityType: 'country-strategy',
                entityId: '64',
              }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
