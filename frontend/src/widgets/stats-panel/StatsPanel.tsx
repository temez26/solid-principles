import React from 'react';
import { useTodoRepository } from '../../entities/todo';
import { IoListOutline, IoFlameOutline, IoCheckmarkDoneOutline, IoTrendingUpOutline } from 'react-icons/io5';
import styles from './StatsPanel.module.css';

export const StatsPanel: React.FC = () => {
  const { todos } = useTodoRepository();

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

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