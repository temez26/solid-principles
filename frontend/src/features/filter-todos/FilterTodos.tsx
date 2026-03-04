import React, { useState, useEffect } from 'react';
import { useTodoRepository } from '../../entities/todo';
import type { Todo } from '../../entities/todo';
import { applyFilter, applySearch } from './filterStrategies';
import styles from './FilterTodos.module.css';

type FilterType = 'all' | 'active' | 'completed';

interface FilterTodosProps {
  onFilter: (filtered: Todo[]) => void;
}

export const FilterTodos: React.FC<FilterTodosProps> = ({ onFilter }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const { todos } = useTodoRepository();

  useEffect(() => {
    const filtered = applyFilter(todos, activeFilter);
    const searched = applySearch(filtered, search);
    onFilter(searched);
  }, [todos, activeFilter, search]);

  const handleFilter = (type: FilterType) => {
    setActiveFilter(type);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        {(['all', 'active', 'completed'] as FilterType[]).map((type) => (
          <button
            key={type}
            className={`${styles.chip} ${activeFilter === type ? styles.active : ''}`}
            onClick={() => handleFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search todos..."
        className={styles.search}
      />
    </div>
  );
};