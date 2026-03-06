import type React from 'react';
import {
  IoListOutline,
  IoFlameOutline,
  IoCheckmarkDoneOutline,
  IoTrendingUpOutline,
} from 'react-icons/io5';

import type { Todo } from '../../entities/todo';
import { computeTodoStats } from '../../entities/todo';

import styles from './StatsPanel.module.css';

interface StatsPanelProps {
  todos: Todo[];
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ todos }) => {
  const { total, active, completed, percentage } = computeTodoStats(todos);

  return (
    <div className={styles.panel}>
      <div className={styles.stat}>
        <span className={styles.icon} style={{ color: 'var(--color-accent)' }}>
          <IoListOutline />
        </span>
        <span className={styles.value}>{total}</span>
        <span className={styles.label}>Total</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.icon} style={{ color: '#f59e0b' }}>
          <IoFlameOutline />
        </span>
        <span className={styles.value}>{active}</span>
        <span className={styles.label}>Active</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.icon} style={{ color: '#10b981' }}>
          <IoCheckmarkDoneOutline />
        </span>
        <span className={styles.value}>{completed}</span>
        <span className={styles.label}>Completed</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.icon} style={{ color: '#8b5cf6' }}>
          <IoTrendingUpOutline />
        </span>
        <span className={styles.value}>{percentage}%</span>
        <span className={styles.label}>Progress</span>
      </div>
    </div>
  );
};
