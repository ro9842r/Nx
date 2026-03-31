export type StrategyStatus = 'draft' | 'active' | 'archived';

export interface CountryStrategy {
  id: string;
  title: string;
  owner: string;
  country: string;
  status: StrategyStatus;
}

export type CountryStrategySummary = Pick<CountryStrategy, 'id' | 'title' | 'owner'>;
