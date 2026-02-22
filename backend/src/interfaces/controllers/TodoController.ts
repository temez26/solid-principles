import type { Request, Response, NextFunction } from 'express';
import type { CreateTodoUseCase } from '../../application/useCases/CreateTodoUseCase';
import type { GetTodosUseCase } from '../../application/useCases/GetTodosUseCase';
import type { ToggleTodoUseCase } from '../../application/useCases/ToggleTodoUseCase';
import type { DeleteTodoUseCase } from '../../application/useCases/DeleteTodoUseCase';

/**
 * SRP: Only translates HTTP ↔ Use Cases.
 * Zero business logic here.
 *
 * DIP: Depends on use case abstractions injected via constructor.
 */
export class TodoController {
  constructor(
    private readonly createTodo: CreateTodoUseCase,
    private readonly getTodos: GetTodosUseCase,
    private readonly toggleTodo: ToggleTodoUseCase,
    private readonly deleteTodo: DeleteTodoUseCase,
  ) {}

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const todos = await this.getTodos.execute();
      res.json({ data: todos });
    } catch (err) {
      next(err);
    }
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { title } = req.body;
      const todo = await this.createTodo.execute({ title });
      res.status(201).json({ data: todo });
    } catch (err) {
      next(err);
    }
  };

  toggle = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const todo = await this.toggleTodo.execute(String(id));
      res.json({ data: todo });
    } catch (err) {
      next(err);
    }
  };

  remove = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      await this.deleteTodo.execute(String(id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}