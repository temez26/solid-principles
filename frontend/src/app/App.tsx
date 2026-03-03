import React, { useEffect } from 'react';
import { ThemeProvider } from './providers/ThemeProvider';
import { AppRouter } from './router';
import { AuthGuard } from '../shared/ui/AuthGuard/AuthGuard';
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
