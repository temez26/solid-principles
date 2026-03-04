import React from 'react';
import { AuthRepositoryProvider, useZustandAuthRepository } from '../../entities/user';

/**
 * App-level provider that injects the concrete AuthRepository.
 * This is the ONLY place in the entire app that knows which
 * implementation is being used. Swap this one line to change
 * from REST API to localStorage, in-memory, or a test mock.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const repository = useZustandAuthRepository();

  return (
    <AuthRepositoryProvider repository={repository}>
      {children}
    </AuthRepositoryProvider>
  );
};