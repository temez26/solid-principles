import { Router } from 'express';
import type { IModule, ModuleDeps } from '../../core/Module';
import { PostgresUserRepository } from './infrastructure/repositories/PostgresUserRepository';
import { RegisterUserUseCase } from './application/useCases/RegisterUserUseCase';
import { LoginUserUseCase } from './application/useCases/LoginUserUseCase';
import { GetUserUseCase } from './application/useCases/GetUserUseCase';
import { UpdateUserUseCase } from './application/useCases/UpdateUserUseCase';
import { DeleteUserUseCase } from './application/useCases/DeleteUserUseCase';
import { UserController } from './presentation/controllers/UserController';
import { createUserRoutes } from './presentation/routes/userRoutes';

export class UserModule implements IModule {
  readonly path = '/api/users';
  private router!: Router;

  register(deps: ModuleDeps): void {
    const repository = new PostgresUserRepository(deps.pool);

    const registerUser = new RegisterUserUseCase(repository);
    const loginUser = new LoginUserUseCase(repository);
    const getUser = new GetUserUseCase(repository);
    const updateUser = new UpdateUserUseCase(repository);
    const deleteUser = new DeleteUserUseCase(repository);

    const controller = new UserController(
      registerUser,
      loginUser,
      getUser,
      updateUser,
      deleteUser,
    );

    this.router = createUserRoutes(controller);
  }

  getRouter(): Router {
    return this.router;
  }
}