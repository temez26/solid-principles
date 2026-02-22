import { Todo } from '../../domain/entities/Todo';
import type { TodoResponseDTO } from './TodoResponseDTO';

/**
 * SRP: Single purpose — maps domain entities to DTOs.
 * Prevents domain leakage into interface/infrastructure layers.
 */
export class TodoMapper {
  public static toDTO(todo: Todo): TodoResponseDTO {
    return {
      id: todo.getId(),
      title: todo.getTitle(),
      completed: todo.isCompleted(),
      createdAt: todo.getCreatedAt().toISOString(),
    };
  }

  public static toDTOList(todos: Todo[]): TodoResponseDTO[] {
    return todos.map(TodoMapper.toDTO);
  }
}