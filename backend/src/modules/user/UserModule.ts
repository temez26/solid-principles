import { Router } from 'express';
import type { IModule, ModuleDeps } from '../../core/Module';
import { PostgresUserRepository } from './infrastructure/repositories/PostgresUserRepository';
import { BcryptPasswordHasher } from '../../shared/infrastructure/services/BcryptPasswordHasher';
import { RegisterUserUseCase } from './application/useCases/RegisterUserUseCase';
import { UserController } from './presentation/controllers/UserController';
import { createUserRoutes } from './presentation/routes/userRoutes';

export class UserModule implements IModule {
  readonly path = '/api/users';
  private router!: Router;

  register(deps: ModuleDeps): void {
    const repository = new PostgresUserRepository(deps.pool);
    const passwordHasher = new BcryptPasswordHasher();

    const registerUser = new RegisterUserUseCase(repository, passwordHasher);

    const controller = new UserController(
      registerUser,
    );

    this.router = createUserRoutes(controller);
  }

  getRouter(): Router {
    return this.router;
  }
}