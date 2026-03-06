import type { Todo } from './types';

/**
 * SOLID — Interface Segregation Principle
 *
 * Split into state (reactive data) and actions (stable commands)
 * so consumers only depend on what they actually use.
 */
export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export interface TodoActions {
  fetchAll(): Promise<void>;
  add(title: string): Promise<void>;
  remove(id: string): Promise<void>;
  toggle(id: string): Promise<void>;
}

/**
 * SOLID — Dependency Inversion Principle
 *
 * Features depend on this abstraction, NOT on a concrete store.
 * We can swap the implementation (in-memory, REST API, localStorage)
 * without changing any feature code.
 */
export interface TodoRepository extends TodoState, TodoActions {}