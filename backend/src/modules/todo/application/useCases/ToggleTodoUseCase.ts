import type { UseCase } from './UseCase';
import type { TodoRepository } from '../../domain/repositories/TodoRepository';
import type { TodoResponseDTO } from '../dtos/TodoResponseDTO';
import { NotFoundError } from '../../../../shared/errors/DomainError';
import { TodoMapper } from '../dtos/TodoMapper';

export class ToggleTodoUseCase implements UseCase<string, TodoResponseDTO> {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id: string): Promise<TodoResponseDTO> {
    const todo = await this.todoRepository.findById(id);

    if (!todo) {
      throw new NotFoundError('Todo', id);
    }

    todo.toggleStatus();
    await this.todoRepository.save(todo);
    return TodoMapper.toDTO(todo);
  }
}