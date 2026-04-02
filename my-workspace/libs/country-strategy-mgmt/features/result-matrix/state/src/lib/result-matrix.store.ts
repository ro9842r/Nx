import { computed, Signal } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { ResultMatrix, ResultMatrixSummary } from '@oper/rm-types';

interface ResultMatrixState {
  matrices: ResultMatrixSummary[];
  selected: ResultMatrix | null;
  loadedAt: number | null;
  isStale: boolean;
  loading: boolean;
  saving: boolean;
  error: string | null;
}

export class ResultMatrixStore {
  private readonly state = signalState<ResultMatrixState>({
    matrices: [],
    selected: null,
    loadedAt: null,
    isStale: true,
    loading: false,
    saving: false,
    error: null,
  });

  readonly matrices: Signal<ResultMatrixSummary[]> = computed(() => this.state.matrices());
  readonly selected: Signal<ResultMatrix | null> = computed(() => this.state.selected());
  readonly loadedAt: Signal<number | null> = computed(() => this.state.loadedAt());
  readonly isStale: Signal<boolean> = computed(() => this.state.isStale());
  readonly loading: Signal<boolean> = computed(() => this.state.loading());
  readonly saving: Signal<boolean> = computed(() => this.state.saving());
  readonly error: Signal<string | null> = computed(() => this.state.error());

  setLoading(loading: boolean): void {
    patchState(this.state, { loading });
  }

  setSaving(saving: boolean): void {
    patchState(this.state, { saving });
  }

  setError(error: string | null): void {
    patchState(this.state, { error });
  }

  setMatrices(matrices: ResultMatrixSummary[]): void {
    patchState(this.state, {
      matrices,
      loadedAt: Date.now(),
      isStale: false,
      error: null,
    });
  }

  setSelected(selected: ResultMatrix | null): void {
    patchState(this.state, { selected, error: null });
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
