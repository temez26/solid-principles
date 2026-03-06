import type React from 'react';

import { useTheme } from '../../shared/hooks/useTheme';
import { Card } from '../../shared/ui/Card';
import { Toggle } from '../../shared/ui/Toggle';

import styles from './SettingsPage.module.css';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Settings</h1>
      <Card className={styles.section}>
        <h2 className={styles.subheading}>Appearance</h2>
        <div className={styles.row}>
          <Toggle label="Dark Mode" checked={theme === 'dark'} onChange={toggleTheme} />
        </div>
      </Card>
    </div>
  );
};
