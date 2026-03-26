import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  it('loads mock orders into store', () => {
    const service = new OrdersService();

    service.load();

    expect(service.store.orders().length).toBeGreaterThan(0);
  });
});
