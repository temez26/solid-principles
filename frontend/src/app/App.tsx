import React, { useEffect } from 'react';
import { ThemeProvider, AuthGuard } from './providers';
import { AppRouter } from './router';
import { useAuthStore } from '../entities/user';

const AppContent: React.FC = () => {
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthGuard>
      <AppRouter />
    </AuthGuard>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};
