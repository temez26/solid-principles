import { Router } from 'express';
import type { IModule, ModuleDeps } from '../../core/Module';
import { PostgresTodoRepository } from './infrastructure/repositories/PostgresTodoRepository';
import { CreateTodoUseCase } from './application/useCases/CreateTodoUseCase';
import { GetTodosUseCase } from './application/useCases/GetTodosUseCase';
import { ToggleTodoUseCase } from './application/useCases/ToggleTodoUseCase';
import { DeleteTodoUseCase } from './application/useCases/DeleteTodoUseCase';
import { TodoController } from './presentation/controllers/TodoController';
import { createTodoRoutes } from './presentation/routes/todoRoutes';

/**
 * SRP: This class is the single place that knows how to wire up the Todo feature.
 * DIP: Depends on IModule abstraction, not on concrete server internals.
 */
export class TodoModule implements IModule {
  readonly path = '/api/todos';
  private router!: Router;

  register(deps: ModuleDeps): void {

    const repository = new PostgresTodoRepository(deps.pool);

    const createTodo = new CreateTodoUseCase(repository);
    const getTodos = new GetTodosUseCase(repository);
    const toggleTodo = new ToggleTodoUseCase(repository);
    const deleteTodo = new DeleteTodoUseCase(repository);

    const controller = new TodoController(createTodo, getTodos, toggleTodo, deleteTodo);

    this.router = createTodoRoutes(controller);
  }

  getRouter(): Router {
    return this.router;
  }
}