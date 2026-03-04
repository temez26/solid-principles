import React, { useState } from 'react';
import { Card } from '../../shared/ui/Card';
import { Toggle } from '../../shared/ui/Toggle';
import { useTheme } from '../../shared/hooks/useTheme';
import styles from './SettingsPage.module.css';

/**
 * SRP: only renders settings UI.
 * Demonstrates separation of concerns: theme logic lives in ThemeProvider,
 * this page simply consumes it via useTheme hook.
 */
export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Settings</h1>
      <Card className={styles.section}>
        <h2 className={styles.subheading}>Appearance</h2>
        <div className={styles.row}>
          <Toggle
            label="Dark Mode"
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
        </div>
      </Card>
      <Card className={styles.section}>
        <h2 className={styles.subheading}>Preferences</h2>
        <div className={styles.row}>
          <Toggle
            label="Notifications"
            checked={notifications}
            onChange={setNotifications}
          />
        </div>
        <div className={styles.row}>
          <Toggle
            label="Compact Mode"
            checked={compactMode}
            onChange={setCompactMode}
          />
        </div>
      </Card>
    </div>
  );
};