import React, { useEffect } from 'react';
import { StatsPanel } from '../../widgets/stats-panel/StatsPanel';
import { TodoList } from '../../widgets/todo-list/TodoList';
import { Card } from '../../shared/ui/Card/Card';
import { useTodoStore } from '../../entities/todo';
import { useDeleteTodo } from '../../features/delete-todo/deleteTodo';
import { useToggleTodo } from '../../features/toggle-todo/toggleTodo';
import styles from './DashboardPage.module.css';

export const DashboardPage: React.FC = () => {
  const todos = useTodoStore((s) => s.todos);
  const fetchAll = useTodoStore((s) => s.fetchAll);
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
          todos={recent}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          emptyMessage="Add your first todo →"
        />
      </Card>
    </div>
  );
};