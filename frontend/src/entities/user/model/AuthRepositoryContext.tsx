import React, { createContext, useContext } from 'react';
import type { AuthRepository } from './repository';

const AuthRepositoryContext = createContext<AuthRepository | null>(null);

export const useAuthRepository = (): AuthRepository => {
  const repo = useContext(AuthRepositoryContext);
  if (!repo) {
    throw new Error('useAuthRepository must be used within an AuthRepositoryProvider');
  }
  return repo;
};

interface Props {
  repository: AuthRepository;
  children: React.ReactNode;
}

export const AuthRepositoryProvider: React.FC<Props> = ({ repository, children }) => {
  return (
    <AuthRepositoryContext.Provider value={repository}>
      {children}
    </AuthRepositoryContext.Provider>
  );
};