import { Router } from 'express';
import type { TodoController } from '../controllers/TodoController';
import type { IJwtService } from '../../../../shared/domain/services/IJwtService';
import { createAuthMiddleware } from '../../../../shared/infrastructure/middleware/authMiddleware';

/**
 * SRP: Only declares route → controller mapping.
 */
export function createTodoRoutes(
  controller: TodoController,
  jwtService: IJwtService,
): Router {
  const router = Router();
  const auth = createAuthMiddleware(jwtService);

  router.get('/',              auth, controller.getAll);
  router.post('/',             auth, controller.create);
  router.patch('/:id/toggle',  auth, controller.toggle);
  router.delete('/:id',        auth, controller.remove);

  return router;
}