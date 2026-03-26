import { AuthService } from './auth.service';

describe('AuthService', () => {
  it('stores the logged user', () => {
    const service = new AuthService();

    service.login('user@demo.com');

    expect(service.store.currentUser()?.email).toBe('user@demo.com');
  });
});
