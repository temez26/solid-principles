import React from 'react';
import { ThemeProvider } from './providers/ThemeProvider';
import { AppRouter } from './router';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
};