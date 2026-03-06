import type React from 'react';

import type { TodoFilter } from '../../entities/todo';

import styles from './FilterTodos.module.css';

interface FilterTodosProps {
  activeFilter: TodoFilter;
  onFilterChange: (type: TodoFilter) => void;
  search: string;
  onSearchChange: (query: string) => void;
}

export const FilterTodos: React.FC<FilterTodosProps> = ({
  activeFilter,
  onFilterChange,
  search,
  onSearchChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        {(['all', 'active', 'completed'] as TodoFilter[]).map((type) => (
          <button
            key={type}
            className={`${styles.chip} ${activeFilter === type ? styles.active : ''}`}
            onClick={() => onFilterChange(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search todos..."
        className={styles.search}
      />
    </div>
  );
};
