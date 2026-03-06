import type { Todo } from './types';

export interface TodoStats {
  total: number;
  active: number;
  completed: number;
  percentage: number;
}

export function computeTodoStats(todos: Todo[]): TodoStats {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { total, active, completed, percentage };
}
