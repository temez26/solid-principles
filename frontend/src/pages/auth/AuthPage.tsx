import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from '../../entities/user';
import { LoginForm, RegisterForm } from '../../features/auth';
import styles from './AuthPage.module.css';

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { isAuthenticated } = useAuthState();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.page}>
      {mode === 'login' ? (
        <LoginForm onSwitchToRegister={() => setMode('register')} />
      ) : (
        <RegisterForm onSwitchToLogin={() => setMode('login')} />
      )}
    </div>
  );
};
