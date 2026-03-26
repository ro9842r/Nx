import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersUiComponents } from './orders-ui-components';

describe('OrdersUiComponents', () => {
  let component: OrdersUiComponents;
  let fixture: ComponentFixture<OrdersUiComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersUiComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersUiComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
