import type { Request, Response, NextFunction } from 'express';
import type { IJwtService } from '../../domain/services/IJwtService';

/**
 * SRP: Only extracts and validates the JWT. Nothing else.
 * DIP: Depends on IJwtService abstraction, not a concrete implementation.
 *
 * Usage:
 *   router.get('/me', createAuthMiddleware(jwtService), controller.getMe);
 */
export function createAuthMiddleware(jwtService: IJwtService) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing or malformed Authorization header',
      });
      return;
    }

    const token = authHeader.slice(7);

    try {
      req.user = jwtService.verify(token);
      next();
    } catch (err) {
      next(err);
    }
  };
}