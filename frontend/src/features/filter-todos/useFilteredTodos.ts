import { useState, useMemo } from 'react';
import type { Todo, TodoFilter } from '../../entities/todo';
import { applyFilter, applySearch } from './filterStrategies';

export function useFilteredTodos(todos: Todo[]) {
  const [activeFilter, setActiveFilter] = useState<TodoFilter>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const byFilter = applyFilter(todos, activeFilter);
    return applySearch(byFilter, search);
  }, [todos, activeFilter, search]);

  return { filtered, activeFilter, setActiveFilter, search, setSearch };
}
