import { computed, Signal } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { CountryStrategy, CountryStrategySummary } from '@oper/cs-types';

interface CountryStrategyState {
  strategies: CountryStrategySummary[];
  selected: CountryStrategy | null;
  loadedAt: number | null;
  isStale: boolean;
}

export class CountryStrategyStore {
  private readonly state = signalState<CountryStrategyState>({
    strategies: [],
    selected: null,
    loadedAt: null,
    isStale: true,
  });

  readonly strategies: Signal<CountryStrategySummary[]> = computed(() => this.state.strategies());
  readonly selected: Signal<CountryStrategy | null> = computed(() => this.state.selected());
  readonly loadedAt: Signal<number | null> = computed(() => this.state.loadedAt());
  readonly isStale: Signal<boolean> = computed(() => this.state.isStale());

  setStrategies(strategies: CountryStrategySummary[]): void {
    patchState(this.state, {
      strategies,
      loadedAt: Date.now(),
      isStale: false,
    });
  }

  setSelected(strategy: CountryStrategy | null): void {
    patchState(this.state, { selected: strategy });
  }

  invalidate(): void {
    patchState(this.state, { isStale: true });
  }

  shouldRefetch(maxAgeMs: number): boolean {
    const loadedAt = this.loadedAt();
    if (this.isStale() || loadedAt === null) {
      return true;
    }
    return Date.now() - loadedAt > maxAgeMs;
  }
}
