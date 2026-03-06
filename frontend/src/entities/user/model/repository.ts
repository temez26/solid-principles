import type { User } from './types';

/**
 * SOLID — Interface Segregation Principle
 *
 * Split into state (reactive data) and actions (stable commands)
 * so consumers only depend on what they actually use.
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  register(username: string, email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<void>;
  logout(): void;
  checkAuth(): Promise<void>;
  clearError(): void;
}

export interface AuthRepository extends AuthState, AuthActions {}
