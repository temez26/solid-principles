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

  const publicRouter = Router();
  publicRouter.post('/register', controller.createUser);
  publicRouter.post('/login',    controller.loginUser);

  const protectedRouter = Router();
  protectedRouter.use(auth);
  protectedRouter.get('/me',      controller.getMe);
  protectedRouter.get('/:id',     controller.getUserById);
  protectedRouter.patch('/:id',   controller.updateUser);
  protectedRouter.delete('/:id',  controller.removeUser);

  router.use(publicRouter);
  router.use(protectedRouter);

  return router;
}