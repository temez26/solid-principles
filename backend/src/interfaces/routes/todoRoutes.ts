import { Router } from 'express';
import type { TodoController } from '../controllers/TodoController';

/**
 * SRP: Only declares route → controller mapping.
 */
export function createTodoRoutes(controller: TodoController): Router {
  const router = Router();

  router.get('/', controller.getAll);
  router.post('/', controller.create);
  router.patch('/:id/toggle', controller.toggle);
  router.delete('/:id', controller.remove);

  return router;
}