import React from 'react';
import { AuthStoreProvider, authStore } from '../../entities/user';

/**
 * App-level provider that injects the concrete AuthRepository store.
 * This is the ONLY place in the entire app that knows which
 * store instance is being used. Swap authStore to change
 * from REST API to localStorage, in-memory, or a test mock.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthStoreProvider store={authStore}>
      {children}
    </AuthStoreProvider>
  );
};