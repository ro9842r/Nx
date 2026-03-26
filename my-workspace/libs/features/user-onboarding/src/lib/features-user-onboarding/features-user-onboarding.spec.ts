import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesUserOnboarding } from './features-user-onboarding';

describe('FeaturesUserOnboarding', () => {
  let component: FeaturesUserOnboarding;
  let fixture: ComponentFixture<FeaturesUserOnboarding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesUserOnboarding],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesUserOnboarding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
