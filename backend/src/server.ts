import express from 'express';
import { config } from './config';
import { createContainer } from './core/container';
import { getPool } from './config/database/connection';
import { errorHandler } from './shared/middleware/errorHandler';
import { corsMiddleware } from './shared/middleware/cors';

function bootstrap(): void {
  const app = express();

  app.use(corsMiddleware);
  app.use(express.json());

  // Shared infrastructure deps passed to every module
  const deps = { pool: getPool() };

  // Mount all modules — server has zero knowledge of features
  const registry = createContainer();
  registry.mount(app, deps);

  // Health check (cross-cutting, lives in server)
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use(errorHandler);

  app.listen(config.port, () => {
    console.log(`\n🚀 Server running at http://localhost:${config.port}`);
    console.log(`📋 Health: http://localhost:${config.port}/api/health\n`);
  });
}

bootstrap();