import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogFeatureBrowse } from './catalog-feature-browse';

describe('CatalogFeatureBrowse', () => {
  let component: CatalogFeatureBrowse;
  let fixture: ComponentFixture<CatalogFeatureBrowse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogFeatureBrowse],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogFeatureBrowse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
