import { Injectable } from '@angular/core';
import { CountryStrategyApi } from './country-strategy.api';
import { CountryStrategyStore } from '../state/country-strategy.store';

@Injectable({ providedIn: 'root' })
export class CountryStrategyService {
  private readonly api = new CountryStrategyApi();
  readonly store = new CountryStrategyStore();
  private static readonly cacheTtlMs = 30_000;

  load(force = false): void {
    if (!force && !this.store.shouldRefetch(CountryStrategyService.cacheTtlMs)) {
      return;
    }
    this.store.setStrategies(this.api.list());
  }

  loadById(id: string): void {
    const strategy = this.api.getById(id);
    this.store.setSelected(strategy ?? null);
  }
}
