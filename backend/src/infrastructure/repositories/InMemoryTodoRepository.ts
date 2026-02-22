import type { TodoRepository } from '../../domain/repositories/TodoRepository';
import { Todo } from '../../domain/entities/Todo';

/**
 * LSP — Liskov Substitution Principle
 *
 * Implements TodoRepository. Can be swapped with PostgresTodoRepository
 * without any change to use cases or controllers.
 */
export class InMemoryTodoRepository implements TodoRepository {
  private store: Map<string, Todo> = new Map();

  async findAll(): Promise<Todo[]> {
    return Array.from(this.store.values()).sort(
      (a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime(),
    );
  }

  async findById(id: string): Promise<Todo | null> {
    return this.store.get(id) ?? null;
  }

  async save(todo: Todo): Promise<void> {
    this.store.set(todo.getId(), todo);
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
}