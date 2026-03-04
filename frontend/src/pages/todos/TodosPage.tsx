import React, { useEffect, useState } from 'react';
import { useTodoRepository } from '../../entities/todo';
import type { Todo } from '../../entities/todo';
import { AddTodo } from '../../features/add-todo/AddTodo';
import { useDeleteTodo } from '../../features/delete-todo';
import { useToggleTodo } from '../../features/toggle-todo';
import { FilterTodos } from '../../features/filter-todos';
import { TodoList } from '../../widgets/todo-list/TodoList';
import { StatsPanel } from '../../widgets/stats-panel/StatsPanel';
import styles from './TodosPage.module.css';

export const TodosPage: React.FC = () => {
  const { fetchAll, loading, error } = useTodoRepository();
  const deleteTodo = useDeleteTodo();
  const toggleTodo = useToggleTodo();
  const [filtered, setFiltered] = useState<Todo[] | undefined>(undefined);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  if (loading) return <div className={styles.loading}>Loading todos...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.page}>
      <h1>Todos</h1>
      <StatsPanel />
      <AddTodo />
      <FilterTodos onFilter={setFiltered} />
      <TodoList
        filteredTodos={filtered}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
};