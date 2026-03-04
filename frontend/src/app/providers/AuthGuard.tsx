import React from 'react';
import { useAuthRepository } from '../../entities/user';
import { AuthPage } from '../../pages/auth/AuthPage';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuthRepository();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        color: 'var(--color-text-secondary)',
        fontSize: '1rem',
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return <>{children}</>;
};