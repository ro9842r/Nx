import { inject, Injectable } from '@angular/core';
import { CountryStrategyService } from '@oper/cs-data-access';
import { CountryStrategyStore } from './country-strategy.store';

@Injectable({ providedIn: 'root' })
export class CountryStrategyFacade {
  readonly store = new CountryStrategyStore();
  private static readonly cacheTtlMs = 30_000;
  private readonly service = inject(CountryStrategyService);

  load(force = false): void {
    if (!force && !this.store.shouldRefetch(CountryStrategyFacade.cacheTtlMs)) {
      return;
    }
    this.store.setStrategies(this.service.list());
  }

  loadById(id: string): void {
    const strategy = this.service.getById(id);
    this.store.setSelected(strategy ?? null);
  }
}
