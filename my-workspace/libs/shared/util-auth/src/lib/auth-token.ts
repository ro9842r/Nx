const TOKEN_KEY = 'demo_token';

export const setAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = (): string | null => localStorage.getItem(TOKEN_KEY);
