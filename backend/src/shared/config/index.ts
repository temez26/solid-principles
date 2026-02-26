function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
}

export const config = {
  port: parseInt(process.env.PORT ?? '3001', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  jwtSecret: requireEnv('JWT_SECRET'),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
} as const;