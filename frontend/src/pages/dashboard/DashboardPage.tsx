import React from 'react';
import { StatsPanel } from '../../widgets/stats-panel';
import { TodoList } from '../../widgets/todo-list';
import { Card } from '../../shared/ui/Card';
import { useFetchTodos } from '../../features/fetch-todos';
import { useTodoActions } from '../../entities/todo';
import styles from './DashboardPage.module.css';

export const DashboardPage: React.FC = () => {
  const { todos } = useFetchTodos();
  const { remove, toggle } = useTodoActions();
  const recent = todos.slice(0, 5);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Dashboard</h1>
      <StatsPanel todos={todos} />
      <Card className={styles.recentCard}>
        <h2 className={styles.subheading}>Recent Todos</h2>
        <TodoList
          todos={recent}
          onToggle={toggle}
          onDelete={remove}
        />
      </Card>
    </div>
  );
};