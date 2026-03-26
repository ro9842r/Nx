import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogFeatureDetail } from './catalog-feature-detail';

describe('CatalogFeatureDetail', () => {
  let component: CatalogFeatureDetail;
  let fixture: ComponentFixture<CatalogFeatureDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogFeatureDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogFeatureDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
