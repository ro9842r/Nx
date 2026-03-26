import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly store = new AuthStore();

  login(email: string): void {
    this.store.currentUser.set({
      id: 'usr-1001',
      name: 'Demo User',
      email,
      avatarUrl: '',
    });
  }
}
