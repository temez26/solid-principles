import type React from 'react';

import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({ fullWidth = false, className, ...rest }) => {
  return (
    <input
      className={`${styles.input} ${fullWidth ? styles.fullWidth : ''} ${className ?? ''}`}
      {...rest}
    />
  );
};
