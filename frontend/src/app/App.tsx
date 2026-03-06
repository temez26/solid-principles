import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, AuthProvider, TodoProvider } from './providers';
import { AppRouter } from './router';
import { useAuthRepository } from '../entities/user';

const AppContent: React.FC = () => {
  const { checkAuth } = useAuthRepository();

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