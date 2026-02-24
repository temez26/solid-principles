import type { Request, Response, NextFunction } from 'express';
import type { RegisterUserUseCase } from '../../application/useCases/RegisterUserUseCase';


export class UserController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
  
  ) {}

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.registerUser.execute(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };
}