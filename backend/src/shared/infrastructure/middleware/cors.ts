import type { Request, Response, NextFunction } from 'express';

const ALLOWED_ORIGIN = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

export function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  res.header('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
}