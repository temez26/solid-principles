import type { Request, Response, NextFunction } from 'express';
import { DomainError } from '../../domain/errors/DomainError';

/**
 * SRP: Translates errors into HTTP responses.
 * Catches domain errors and maps them to proper status codes.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error(`[Error] ${err.name}: ${err.message}`);

  if (err instanceof DomainError) {
    res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    error: 'InternalServerError',
    message: 'An unexpected error occurred',
  });
}