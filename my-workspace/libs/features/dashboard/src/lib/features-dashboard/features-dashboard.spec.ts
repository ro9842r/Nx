import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesDashboard } from './features-dashboard';

describe('FeaturesDashboard', () => {
  let component: FeaturesDashboard;
  let fixture: ComponentFixture<FeaturesDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
