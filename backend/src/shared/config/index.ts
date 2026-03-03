function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
}

function optionalEnv(key: string, defaultValue: string): string {
  return process.env[key] ?? defaultValue;
}

const isProduction = process.env.NODE_ENV === 'production';

export const JWT_SECRET = isProduction
  ? requireEnv('JWT_SECRET')
  : optionalEnv('JWT_SECRET', 'change-me-in-development');

export const JWT_EXPIRES_IN = optionalEnv('JWT_EXPIRES_IN', '7d');

export const config = {
  port: parseInt(process.env.PORT ?? '3001', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  jwtSecret: JWT_SECRET,
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
} as const;