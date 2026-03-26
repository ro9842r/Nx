import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogUtilValidators } from './catalog-util-validators';

describe('CatalogUtilValidators', () => {
  let component: CatalogUtilValidators;
  let fixture: ComponentFixture<CatalogUtilValidators>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogUtilValidators],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogUtilValidators);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
