import { signal } from '@angular/core';
import { User } from './user.models';

export class AuthStore {
  readonly currentUser = signal<User | null>(null);
}
