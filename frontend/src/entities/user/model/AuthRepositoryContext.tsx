import type React from 'react';
import { createContext, useContext } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import type { StoreApi } from 'zustand/vanilla';

import type { AuthRepository, AuthState, AuthActions } from './repository';

const AuthStoreContext = createContext<StoreApi<AuthRepository> | null>(null);

function useAuthStore(): StoreApi<AuthRepository> {
  const store = useContext(AuthStoreContext);
  if (!store) {
    throw new Error('useAuthStore must be used within an AuthStoreProvider');
  }
  return store;
}

/** Subscribe to auth state only — re-renders only when state changes */
export function useAuthState(): AuthState {
  return useStore(
    useAuthStore(),
    useShallow((s) => ({
      user: s.user,
      token: s.token,
      loading: s.loading,
      error: s.error,
      isAuthenticated: s.isAuthenticated,
    }))
  );
}

/** Subscribe to auth actions only — never re-renders (actions are stable) */
export function useAuthActions(): AuthActions {
  return useStore(
    useAuthStore(),
    useShallow((s) => ({
      register: s.register,
      login: s.login,
      logout: s.logout,
      checkAuth: s.checkAuth,
      clearError: s.clearError,
    }))
  );
}

/** Full repository access (backward compat) — re-renders on any change */
export function useAuthRepository(): AuthRepository {
  return useStore(useAuthStore());
}

interface Props {
  store: StoreApi<AuthRepository>;
  children: React.ReactNode;
}

export const AuthStoreProvider: React.FC<Props> = ({ store, children }) => {
  return <AuthStoreContext.Provider value={store}>{children}</AuthStoreContext.Provider>;
};
