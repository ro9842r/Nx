import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogUiComponents } from './catalog-ui-components';

describe('CatalogUiComponents', () => {
  let component: CatalogUiComponents;
  let fixture: ComponentFixture<CatalogUiComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogUiComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogUiComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
