import type { Request, Response, NextFunction } from 'express';
import type { RegisterUserUseCase } from '../../application/useCases/RegisterUserUseCase';
import type { GetUserUseCase } from '../../application/useCases/GetUserUseCase';
import type { DeleteUserUseCase } from '../../application/useCases/DeleteUserUseCase';

export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.registerUserUseCase.execute(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.getUserUseCase.execute(String(id));
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  removeUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.deleteUserUseCase.execute(String(id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}