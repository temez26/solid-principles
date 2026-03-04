import { create } from 'zustand';
import type { User } from './types';
import type { AuthRepository } from './repository';
import { authApi, type UserDTO } from '../../../shared/api/authApi';
import { tokenStorage } from '../../../shared/lib/tokenStorage';

interface AuthState extends AuthRepository {}

function dtoToUser(dto: UserDTO): User {
  return {
    id: dto.id,
    username: dto.username,
    email: dto.email,
    createdAt: new Date(dto.createdAt).getTime(),
    updatedAt: new Date(dto.updatedAt).getTime(),
  };
}

const initialToken = tokenStorage.get();

/**
 * Concrete implementation of AuthRepository using Zustand + REST API.
 * This is the ONLY place that knows about Zustand and the auth API.
 * All consumers depend on the AuthRepository abstraction via Context.
 */
const useAuthStoreInternal = create<AuthState>()((set) => ({
  user: null,
  token: initialToken,
  loading: !!initialToken,
  error: null,
  isAuthenticated: false,

  async register(username: string, email: string, password: string) {
    set({ loading: true, error: null });
    try {
      const response = await authApi.register(username, email, password);
      tokenStorage.set(response.token);
      set({
        user: dtoToUser(response.user),
        token: response.token,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
      throw err;
    }
  },

  async login(email: string, password: string) {
    set({ loading: true, error: null });
    try {
      const response = await authApi.login(email, password);
      tokenStorage.set(response.token);
      set({
        user: dtoToUser(response.user),
        token: response.token,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
      throw err;
    }
  },

  logout() {
    tokenStorage.remove();
    set({ user: null, token: null, isAuthenticated: false, error: null });
  },

  async checkAuth() {
    const token = tokenStorage.get();
    if (!token) {
      set({ isAuthenticated: false, user: null, token: null, loading: false });
      return;
    }
    set({ loading: true });
    try {
      const userDto = await authApi.getMe(token);
      set({ user: dtoToUser(userDto), token, isAuthenticated: true, loading: false });
    } catch {
      tokenStorage.remove();
      set({ user: null, token: null, isAuthenticated: false, loading: false });
    }
  },

  clearError() {
    set({ error: null });
  },
}));

/**
 * Public bridge: exposes the Zustand store as an AuthRepository.
 * Import ONLY in AuthProvider.
 */
export const useZustandAuthRepository = (): AuthRepository => useAuthStoreInternal();