import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesCheckoutFlow } from './features-checkout-flow';

describe('FeaturesCheckoutFlow', () => {
  let component: FeaturesCheckoutFlow;
  let fixture: ComponentFixture<FeaturesCheckoutFlow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesCheckoutFlow],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesCheckoutFlow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
