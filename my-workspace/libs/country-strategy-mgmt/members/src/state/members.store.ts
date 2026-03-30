import { computed, Signal } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { Member } from '../types';

interface MembersState {
  members: Member[];
  loading: boolean;
  error: string | null;
}

export class MembersStore {
  private readonly state = signalState<MembersState>({
    members: [],
    loading: false,
    error: null,
  });

  readonly members: Signal<Member[]> = computed(() => this.state.members());
  readonly loading: Signal<boolean> = computed(() => this.state.loading());
  readonly error: Signal<string | null> = computed(() => this.state.error());
  readonly hasMembers: Signal<boolean> = computed(() => this.state.members().length > 0);

  setMembers(members: Member[]): void {
    patchState(this.state, { members, loading: false, error: null });
  }

  setLoading(): void {
    patchState(this.state, { loading: true, error: null });
  }

  setError(error: string): void {
    patchState(this.state, { loading: false, error });
  }
}
