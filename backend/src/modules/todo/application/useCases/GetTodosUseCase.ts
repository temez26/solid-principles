import type { UseCase } from '../../../../shared/application/UseCase';
import type { TodoRepository } from '../../domain/repositories/TodoRepository';
import type { TodoResponseDTO } from '../dtos/TodoResponseDTO';
import { TodoMapper } from '../dtos/TodoMapper';

export class GetTodosUseCase implements UseCase<void, TodoResponseDTO[]> {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(): Promise<TodoResponseDTO[]> {
    const todos = await this.todoRepository.findAll();
    return TodoMapper.toDTOList(todos);
  }
}