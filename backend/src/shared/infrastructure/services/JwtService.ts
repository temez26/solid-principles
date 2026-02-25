import jwt from 'jsonwebtoken';
import type { IJwtService, JwtPayload } from '../../domain/services/IJwtService';
import { ValidationError } from '../../domain/errors/DomainError';

export class JwtService implements IJwtService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(secret: string, expiresIn = '7d') {
    if (!secret) throw new Error('JWT secret must be provided');
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  sign(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verify(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.secret) as JwtPayload;
    } catch {
      throw new ValidationError('Invalid or expired token');
    }
  }
}