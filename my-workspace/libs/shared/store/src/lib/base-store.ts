import { signal, WritableSignal } from '@angular/core';

export const createStore = <T>(initial: T): WritableSignal<T> => signal(initial);
