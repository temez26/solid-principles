import type { Request, Response, NextFunction } from 'express';
import type { RegisterUserUseCase } from '../../application/useCases/RegisterUserUseCase';
import type { LoginUserUseCase } from '../../application/useCases/LoginUserUseCase';
import type { GetUserUseCase } from '../../application/useCases/GetUserUseCase';
import type { GetMeUseCase } from '../../application/useCases/GetMeUseCase';
import type { DeleteUserUseCase } from '../../application/useCases/DeleteUserUseCase';
import type { UpdateUserUseCase } from '../../application/useCases/UpdateUserUseCase';

export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getMeUseCase: GetMeUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.registerUserUseCase.execute(req.body);
      res.status(201).json(user);
    } catch (err) { next(err); }
  };

  loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.loginUserUseCase.execute(req.body);
      res.json(result);
    } catch (err) { next(err); }
  };

  getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // req.user is set by authMiddleware
      const user = await this.getMeUseCase.execute(req.user!.sub);
      res.json(user);
    } catch (err) { next(err); }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.getUserUseCase.execute(req.params.id);
      res.json(user);
    } catch (err) { next(err); }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.updateUserUseCase.execute({ id: req.params.id, ...req.body });
      res.json(user);
    } catch (err) { next(err); }
  };

  removeUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.deleteUserUseCase.execute(req.params.id);
      res.status(204).send();
    } catch (err) { next(err); }
  };
}