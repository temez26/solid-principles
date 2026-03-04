export interface AuthRepository {
  user: import('./types').User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  register(username: string, email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<void>;
  logout(): void;
  checkAuth(): Promise<void>;
  clearError(): void;
}