import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersFeatureOrderList } from './orders-feature-order-list';

describe('OrdersFeatureOrderList', () => {
  let component: OrdersFeatureOrderList;
  let fixture: ComponentFixture<OrdersFeatureOrderList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersFeatureOrderList],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersFeatureOrderList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
