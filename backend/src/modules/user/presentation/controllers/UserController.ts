import type { RequestHandler } from 'express';
import type { RegisterUserUseCase } from '../../application/useCases/RegisterUserUseCase';
import type { LoginUserUseCase } from '../../application/useCases/LoginUserUseCase';
import type { GetUserUseCase } from '../../application/useCases/GetUserUseCase';
import type { GetMeUseCase } from '../../application/useCases/GetMeUseCase';
import type { DeleteUserUseCase } from '../../application/useCases/DeleteUserUseCase';
import type { UpdateUserUseCase } from '../../application/useCases/UpdateUserUseCase';
import type { RegisterUserDTO, LoginUserDTO, UpdateUserDTO } from '../../application/dtos/UserDTOs';
import type { AuthorizedRequest } from '../../../../shared/infrastructure/middleware/authMiddleware';

export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getMeUseCase: GetMeUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  createUser: RequestHandler = async (req, res, next) => {
    try {
      const result = await this.registerUserUseCase.execute(req.body as RegisterUserDTO);
      res.status(201).json(result);
    } catch (err) { next(err); }
  };

  loginUser: RequestHandler = async (req, res, next) => {
    try {
      const result = await this.loginUserUseCase.execute(req.body as LoginUserDTO);
      res.json(result);
    } catch (err) { next(err); }
  };

  getMe: RequestHandler = async (req, res, next) => {
    try {
      const { sub } = (req as AuthorizedRequest).user;
      const user = await this.getMeUseCase.execute(sub);
      res.json(user);
    } catch (err) { next(err); }
  };

  getUserById: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.getUserUseCase.execute(String(req.params.id));
      res.json(user);
    } catch (err) { next(err); }
  };

  updateUser: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.updateUserUseCase.execute(req.body as UpdateUserDTO);
      res.json(user);
    } catch (err) { next(err); }
  };

  removeUser: RequestHandler = async (req, res, next) => {
    try {
      await this.deleteUserUseCase.execute(String(req.params.id));
      res.status(204).send();
    } catch (err) { next(err); }
  };
}