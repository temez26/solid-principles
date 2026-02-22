import type { Todo } from './types';

/**
 * SOLID — Dependency Inversion Principle
 *
 * Features depend on this abstraction, NOT on a concrete store.
 * We can swap the implementation (in-memory, REST API, localStorage)
 * without changing any feature code.
 */
export interface TodoRepository {
  getAll(): Todo[];
  add(todo: Todo): void;
  remove(id: string): void;
  toggle(id: string): void;
  update(id: string, changes: Partial<Omit<Todo, 'id'>>): void;
}