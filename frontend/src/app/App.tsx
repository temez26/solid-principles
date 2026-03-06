import type React from 'react';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useAuthActions } from '../entities/user';

import { ThemeProvider, AuthProvider, TodoProvider } from './providers';
import { AppRouter } from './router';

const AppContent: React.FC = () => {
  const { checkAuth } = useAuthActions();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <TodoProvider>
      <AppRouter />
    </TodoProvider>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
