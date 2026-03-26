import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  it('loads mock products into store', () => {
    const service = new CatalogService();

    service.load();

    expect(service.store.products().length).toBeGreaterThan(0);
  });
});
