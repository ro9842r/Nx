import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  it('loads mock orders into store', () => {
    const service = new OrdersService();

    service.load();

    expect(service.store.orders().length).toBeGreaterThan(0);
  });

  it('invalidates and refreshes cache after create', () => {
    const service = new OrdersService();
    service.load(true);
    const before = service.store.orders().length;

    service.create({
      customerName: 'Spec User',
      total: 10,
      status: 'pending',
    });

    expect(service.store.orders().length).toBe(before + 1);
    expect(service.store.isStale()).toBe(false);
  });
});
