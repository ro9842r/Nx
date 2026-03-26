import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersFeatureCheckout } from './orders-feature-checkout';

describe('OrdersFeatureCheckout', () => {
  let component: OrdersFeatureCheckout;
  let fixture: ComponentFixture<OrdersFeatureCheckout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersFeatureCheckout],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersFeatureCheckout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
