import type { Todo, TodoFilter } from '../../entities/todo';

/**
 * SOLID — Open/Closed Principle
 *
 * Strategy pattern: add new filters by adding entries to
 * `filterStrategies` without modifying existing filter code.
 */
type FilterStrategy = (todos: Todo[]) => Todo[];

const filterStrategies: Record<TodoFilter, FilterStrategy> = {
  all: (todos) => todos,
  active: (todos) => todos.filter((t) => !t.completed),
  completed: (todos) => todos.filter((t) => t.completed),
};

export function applyFilter(todos: Todo[], filter: TodoFilter): Todo[] {
  const strategy = filterStrategies[filter];
  return strategy(todos);
}

/** Easily extend: add 'overdue', 'today', etc. without touching above code */
export function registerFilter(name: TodoFilter, strategy: FilterStrategy) {
  filterStrategies[name] = strategy;
}