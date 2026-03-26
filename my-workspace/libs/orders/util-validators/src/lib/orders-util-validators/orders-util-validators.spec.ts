import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersUtilValidators } from './orders-util-validators';

describe('OrdersUtilValidators', () => {
  let component: OrdersUtilValidators;
  let fixture: ComponentFixture<OrdersUtilValidators>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersUtilValidators],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersUtilValidators);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
