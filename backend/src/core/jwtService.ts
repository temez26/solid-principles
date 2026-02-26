import { JwtService } from '../shared/infrastructure/services/JwtService';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../shared/config';

export function createJwtService(): JwtService {
  return new JwtService(JWT_SECRET, JWT_EXPIRES_IN);
}