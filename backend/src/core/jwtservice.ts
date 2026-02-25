import { JwtService } from '../shared/infrastructure/services/JwtService';

export function createJwtService(): JwtService {
  return new JwtService(
    process.env.JWT_SECRET ?? 'change-me-in-production',
    process.env.JWT_EXPIRES_IN ?? '7d',
  );
}