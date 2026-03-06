import React from 'react';
import { useFetchTodos } from '../../features/fetch-todos';
import { AddTodo } from '../../features/add-todo';
import { useTodoRepository } from '../../entities/todo';
import { FilterTodos, useFilteredTodos } from '../../features/filter-todos';
import { TodoList } from '../../widgets/todo-list';
import { StatsPanel } from '../../widgets/stats-panel';
import styles from './TodosPage.module.css';

export const TodosPage: React.FC = () => {
  const { todos, loading, error } = useFetchTodos();
  const { remove, toggle } = useTodoRepository();
  const { filtered, activeFilter, setActiveFilter, search, setSearch } = useFilteredTodos(todos);

  if (loading) return <div className={styles.loading}>Loading todos...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.page}>
      <h1>Todos</h1>
      <StatsPanel todos={todos} />
      <AddTodo />
      <FilterTodos
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        search={search}
        onSearchChange={setSearch}
      />
      <TodoList
        todos={filtered}
        onToggle={toggle}
        onDelete={remove}
      />
    </div>
  );
};