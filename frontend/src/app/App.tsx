import React, { useEffect } from 'react';
import { ThemeProvider, AuthGuard, AuthProvider, TodoProvider } from './providers';
import { AppRouter } from './router';
import { useAuthRepository } from '../entities/user';

const AppContent: React.FC = () => {
  const { checkAuth } = useAuthRepository();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthGuard>
      <TodoProvider>
        <AppRouter />
      </TodoProvider>
    </AuthGuard>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};