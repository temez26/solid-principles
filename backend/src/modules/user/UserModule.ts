import { Router } from 'express';
import type { IModule, ModuleDeps } from '../../core/Module';
import { PostgresUserRepository } from './infrastructure/repositories/PostgresUserRepository';
import { BcryptPasswordHasher } from '../../shared/infrastructure/services/BcryptPasswordHasher';
import { RegisterUserUseCase } from './application/useCases/RegisterUserUseCase';
import { LoginUserUseCase } from './application/useCases/LoginUserUseCase';
import { GetUserUseCase } from './application/useCases/GetUserUseCase';
import { GetMeUseCase } from './application/useCases/GetMeUseCase';
import { DeleteUserUseCase } from './application/useCases/DeleteUserUseCase';
import { UpdateUserUseCase } from './application/useCases/UpdateUserUseCase';
import { UserController } from './presentation/controllers/UserController';
import { createUserRoutes } from './presentation/routes/userRoutes';

export class UserModule implements IModule {
  readonly path = '/api/users';
  private router!: Router;

  register(deps: ModuleDeps): void {
    const repository = new PostgresUserRepository(deps.pool);
    const passwordHasher = new BcryptPasswordHasher();

    const registerUser = new RegisterUserUseCase(repository, passwordHasher, deps.jwtService);
    const loginUser    = new LoginUserUseCase(repository, passwordHasher, deps.jwtService);
    const getUser      = new GetUserUseCase(repository);
    const getMe        = new GetMeUseCase(repository);
    const deleteUser   = new DeleteUserUseCase(repository);
    const updateUser   = new UpdateUserUseCase(repository, passwordHasher);

    const controller = new UserController(
      registerUser,
      loginUser,
      getUser,
      getMe,
      deleteUser,
      updateUser,
    );

    this.router = createUserRoutes(controller, deps.jwtService);
  }

  getRouter(): Router {
    return this.router;
  }
}