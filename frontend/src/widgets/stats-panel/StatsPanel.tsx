import React from 'react';
import { IoCheckmarkDone, IoList, IoTime } from 'react-icons/io5';
import { Card } from '../../shared/ui/Card/Card';
import { useTodoStore } from '../../entities/todo';
import styles from './StatsPanel.module.css';

export const StatsPanel: React.FC = () => {
  const todos = useTodoStore((s) => s.todos);
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;

  const stats = [
    { label: 'Total', value: total, icon: <IoList size={22} />, color: 'var(--color-accent)' },
    { label: 'Completed', value: completed, icon: <IoCheckmarkDone size={22} />, color: 'var(--color-success)' },
    { label: 'Pending', value: pending, icon: <IoTime size={22} />, color: '#ff9500' },
  ];

  return (
    <div className={styles.grid}>
      {stats.map((s) => (
        <Card key={s.label} className={styles.statCard}>
          <div className={styles.iconWrap} style={{ color: s.color }}>
            {s.icon}
          </div>
          <div className={styles.info}>
            <span className={styles.value}>{s.value}</span>
            <span className={styles.label}>{s.label}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};