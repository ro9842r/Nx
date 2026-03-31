import { Injectable } from '@angular/core';
import { CountryStrategy, CountryStrategySummary } from '@oper/cs-types';

const STRATEGIES: CountryStrategy[] = [
  { id: '64', title: 'Brazil Growth', owner: 'Ops Team', country: 'Brazil', status: 'active' },
  { id: '65', title: 'Chile Expansion', owner: 'Sales Team', country: 'Chile', status: 'draft' },
];

@Injectable({ providedIn: 'root' })
export class CountryStrategyService {
  list(): CountryStrategySummary[] {
    return STRATEGIES.map(({ id, title, owner }) => ({ id, title, owner }));
  }

  getById(id: string): CountryStrategy | undefined {
    return STRATEGIES.find((s) => s.id === id);
  }
}
