import type React from 'react';
import { useState } from 'react';

import { useAuthState, useAuthActions } from '../../entities/user';
import { Button } from '../../shared/ui/Button/Button';
import { Card } from '../../shared/ui/Card/Card';
import { Input } from '../../shared/ui/Input/Input';

import styles from './AuthForm.module.css';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const { loading, error } = useAuthState();
  const { register, clearError } = useAuthActions();
  const displayError = localError ?? error;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    try {
      await register(username.trim(), email.trim(), password);
    } catch {
      // error is set in repository
    }
  };

  const handleChange = () => {
    setLocalError(null);
    clearError();
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1 className={styles.heading}>Create Account</h1>
        <p className={styles.subtitle}>Sign up to get started</p>

        {displayError && <div className={styles.error}>{displayError}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            fullWidth
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              handleChange();
            }}
            required
          />
          <Input
            fullWidth
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleChange();
            }}
            required
          />
          <Input
            fullWidth
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleChange();
            }}
            required
          />
          <Input
            fullWidth
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              handleChange();
            }}
            required
          />
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <div className={styles.footer}>
          Already have an account?{' '}
          <button className={styles.link} onClick={onSwitchToLogin} type="button">
            Sign In
          </button>
        </div>
      </Card>
    </div>
  );
};
