import type { Request, Response, NextFunction } from 'express';
import type { IJwtService, JwtPayload } from '../../domain/services/IJwtService';
import { UnauthorizedError } from '../../domain/errors/DomainError';

/** Before auth middleware — user may not exist */
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

/** After auth middleware — user is guaranteed */
export interface AuthorizedRequest extends Request {
  user: JwtPayload;
}

export function createAuthMiddleware(jwtService: IJwtService) {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return next(new UnauthorizedError('Missing or malformed Authorization header'));
    }

    const token = authHeader.slice(7);

    try {
      req.user = jwtService.verify(token);
      next();
    } catch {
      next(new UnauthorizedError('Invalid or expired token'));
    }
  };
}