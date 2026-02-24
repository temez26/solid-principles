import { Router } from 'express';
import type { UserController } from '../controllers/UserController';

export function createUserRoutes(controller: UserController): Router {
  const router = Router();

  router.post('/register', controller.register);

  return router;
}