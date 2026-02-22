import { Todo } from '../entities/Todo';

/**
 * SOLID — Dependency Inversion Principle
 *
 * This interface lives in the DOMAIN layer.
 * Use cases depend on this abstraction.
 * Infrastructure provides the concrete implementation.
 *
 * This is the critical architectural boundary.
 */
export interface TodoRepository {
  findAll(): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  save(todo: Todo): Promise<void>;
  delete(id: string): Promise<void>;
}