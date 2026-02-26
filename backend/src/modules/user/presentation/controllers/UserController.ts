import type { RequestHandler } from 'express';
import type { RegisterUserUseCase } from '../../application/useCases/RegisterUserUseCase';
import type { LoginUserUseCase } from '../../application/useCases/LoginUserUseCase';
import type { GetUserUseCase } from '../../application/useCases/GetUserUseCase';
import type { DeleteUserUseCase } from '../../application/useCases/DeleteUserUseCase';
import type { UpdateUserUseCase } from '../../application/useCases/UpdateUserUseCase';
import type { RegisterUserDTO, LoginUserDTO, UpdateUserDTO } from '../../application/dtos/UserDTOs';
import type { AuthorizedRequest } from '../../../../shared/infrastructure/middleware/authMiddleware';
import type { IJwtService } from '../../../../shared/domain/services/IJwtService';

export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase:    LoginUserUseCase,
    private readonly getUserUseCase:      GetUserUseCase,
    private readonly deleteUserUseCase:   DeleteUserUseCase,
    private readonly updateUserUseCase:   UpdateUserUseCase,
    private readonly jwtService:          IJwtService,
  ) {}

  createUser: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.registerUserUseCase.execute(req.body as RegisterUserDTO);
      res.status(201).json({ token, user });
    } catch (err) { next(err); }
  };

  loginUser: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.loginUserUseCase.execute(req.body as LoginUserDTO);
      res.status(200).json({ token, user });
    } catch (err) { next(err); }
  };

  getCurrentUser: RequestHandler = async (req, res, next) => {
    try {
      const { sub } = (req as AuthorizedRequest).user;
      const user = await this.getUserUseCase.execute(sub);
      res.json(user);
    } catch (err) { next(err); }
  };

  updateUser: RequestHandler = async (req, res, next) => {
    try {
      const { sub } = (req as AuthorizedRequest).user;
      const user = await this.updateUserUseCase.execute({ ...req.body as UpdateUserDTO, id: sub });
      res.json(user);
    } catch (err) { next(err); }
  };

  removeUser: RequestHandler = async (req, res, next) => {
    try {
      const { sub } = (req as AuthorizedRequest).user;
      await this.deleteUserUseCase.execute(sub);
      res.status(204).send();
    } catch (err) { next(err); }
  };
}