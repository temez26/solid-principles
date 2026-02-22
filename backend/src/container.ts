import { getPool } from './infrastructure/database/connection';
import { PostgresTodoRepository } from './infrastructure/repositories/PostgresTodoRepository';
import { CreateTodoUseCase } from './application/useCases/CreateTodoUseCase';
import { GetTodosUseCase } from './application/useCases/GetTodosUseCase';
import { ToggleTodoUseCase } from './application/useCases/ToggleTodoUseCase';
import { DeleteTodoUseCase } from './application/useCases/DeleteTodoUseCase';
import { TodoController } from './interfaces/controllers/TodoController';

/**
 * Composition Root — Manual Dependency Injection
 *
 * Swapped InMemoryTodoRepository → PostgresTodoRepository.
 * Nothing else changed. This is DIP in action.
 */
export function createContainer() {
  // Infrastructure
  const pool = getPool();
  const todoRepository = new PostgresTodoRepository(pool);

  // Use Cases
  const createTodoUseCase = new CreateTodoUseCase(todoRepository);
  const getTodosUseCase = new GetTodosUseCase(todoRepository);
  const toggleTodoUseCase = new ToggleTodoUseCase(todoRepository);
  const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);

  // Controllers
  const todoController = new TodoController(
    createTodoUseCase,
    getTodosUseCase,
    toggleTodoUseCase,
    deleteTodoUseCase,
  );

  return { todoController };
}