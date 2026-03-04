import React, { useEffect } from 'react';
import { StatsPanel } from '../../widgets/stats-panel';
import { TodoList } from '../../widgets/todo-list';
import { Card } from '../../shared/ui/Card';
import { useTodoRepository } from '../../entities/todo';
import { useDeleteTodo } from '../../features/delete-todo';
import { useToggleTodo } from '../../features/toggle-todo';
import styles from './DashboardPage.module.css';

export const DashboardPage: React.FC = () => {
  const { todos, fetchAll } = useTodoRepository();
  const deleteTodo = useDeleteTodo();
  const toggleTodo = useToggleTodo();
  const recent = todos.slice(0, 5);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Dashboard</h1>
      <StatsPanel />
      <Card className={styles.recentCard}>
        <h2 className={styles.subheading}>Recent Todos</h2>
        <TodoList
          filteredTodos={recent}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </Card>
    </div>
  );
};