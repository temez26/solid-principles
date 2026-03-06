/**
 * NOTE: localStorage is vulnerable to XSS attacks.
 * In production, prefer httpOnly cookies set by the server
 * so the token is never accessible to client-side JavaScript.
 */
const TOKEN_KEY = 'auth_token';

export const tokenStorage = {
  get(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  set(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  remove(): void {
    localStorage.removeItem(TOKEN_KEY);
  },
};
