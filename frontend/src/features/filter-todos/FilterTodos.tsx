import React from 'react';
import type { TodoFilter } from '../../entities/todo';
import styles from './FilterTodos.module.css';

interface FilterTodosProps {
  current: TodoFilter;
  onChange: (filter: TodoFilter) => void;
}

const filters: { label: string; value: TodoFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export const FilterTodos: React.FC<FilterTodosProps> = ({ current, onChange }) => {
  return (
    <div className={styles.filters}>
      {filters.map((f) => (
        <button
          key={f.value}
          className={`${styles.chip} ${current === f.value ? styles.active : ''}`}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};