import { Injectable } from '@angular/core';
import { CountryStrategy, CountryStrategySummary } from '../types';
import { CountryStrategyStore } from '../state/country-strategy.store';

const STRATEGIES: CountryStrategy[] = [
  { id: '64', title: 'Brazil Growth', owner: 'Ops Team', country: 'Brazil', status: 'active' },
  { id: '65', title: 'Chile Expansion', owner: 'Sales Team', country: 'Chile', status: 'draft' },
];

@Injectable({ providedIn: 'root' })
export class CountryStrategyService {
  readonly store = new CountryStrategyStore();
  private static readonly cacheTtlMs = 30_000;

  load(force = false): void {
    if (!force && !this.store.shouldRefetch(CountryStrategyService.cacheTtlMs)) {
      return;
    }
    this.store.setStrategies(this.list());
  }

  loadById(id: string): void {
    const strategy = this.getById(id);
    this.store.setSelected(strategy ?? null);
  }

  private list(): CountryStrategySummary[] {
    return STRATEGIES.map(({ id, title, owner }) => ({ id, title, owner }));
  }

  private getById(id: string): CountryStrategy | undefined {
    return STRATEGIES.find((s) => s.id === id);
  }
}
