import type { Todo } from './types';

/**
 * SOLID — Dependency Inversion Principle
 *
 * Features depend on this abstraction, NOT on a concrete store.
 * We can swap the implementation (in-memory, REST API, localStorage)
 * without changing any feature code.
 */
export interface TodoRepository {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  fetchAll(): Promise<void>;
  getAll(): Todo[];
  add(todo: Todo): Promise<void>;
  remove(id: string): Promise<void>;
  toggle(id: string): Promise<void>;
  update(id: string, changes: Partial<Omit<Todo, 'id'>>): void;
}