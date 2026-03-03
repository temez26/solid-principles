import { Router } from 'express';
import type { UserController } from '../controllers/UserController';
import type { IJwtService } from '../../../../shared/domain/services/IJwtService';
import { createAuthMiddleware } from '../../../../shared/infrastructure/middleware/authMiddleware';

export function createUserRoutes(
  controller: UserController,
  jwtService: IJwtService,
): Router {
  const router = Router();
  const auth = createAuthMiddleware(jwtService);

  router.post('/register', controller.createUser);
  router.post('/login',    controller.loginUser);

  router.get('/me',         auth, controller.getCurrentUser);
  router.patch('/me',       auth, controller.updateUser);
  router.delete('/me',      auth, controller.removeUser);

  return router;
}