import { Router } from 'express';
import type { UserController } from '../controllers/UserController';

export function createUserRoutes(controller: UserController): Router {
  const router = Router();

  router.post('/register', controller.createUser);
  router.get('/:id', controller.getUserById);
  router.delete('/:id', controller.removeUser);

  return router;
}