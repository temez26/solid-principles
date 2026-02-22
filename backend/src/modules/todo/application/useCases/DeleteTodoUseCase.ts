import type { UseCase } from './UseCase';
import type { TodoRepository } from '../../domain/repositories/TodoRepository';
import { NotFoundError } from '../../../../shared/errors/DomainError';

export class DeleteTodoUseCase implements UseCase<string, void> {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id: string): Promise<void> {
    const todo = await this.todoRepository.findById(id);

    if (!todo) {
      throw new NotFoundError('Todo', id);
    }

    await this.todoRepository.delete(id);
  }
}