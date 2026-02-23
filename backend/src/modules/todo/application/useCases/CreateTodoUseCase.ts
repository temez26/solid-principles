import type { UseCase } from './UseCase';
import type { TodoRepository } from '../../domain/repositories/TodoRepository';
import type { CreateTodoDTO } from '../dtos/CreateTodoDTO';
import type { TodoResponseDTO } from '../dtos/TodoResponseDTO';
import { Todo } from '../../domain/entities/Todo';
import { TodoMapper } from '../dtos/TodoMapper';

/**
 * SRP: Only creates a todo.
 * DIP: Depends on TodoRepository interface (domain), not AnyRepository.
 */
export class CreateTodoUseCase implements UseCase<CreateTodoDTO, TodoResponseDTO> {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(input: CreateTodoDTO): Promise<TodoResponseDTO> {
    // Domain entity factory enforces domain rules (e.g., non-empty title)
    const todo = Todo.create(input.title);
    await this.todoRepository.save(todo);
    return TodoMapper.toDTO(todo);
  }
}