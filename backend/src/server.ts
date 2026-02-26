import express from 'express';
import { config } from './shared/config';
import { createContainer } from './core/container';
import { createJwtService } from './core/jwtService';
import { getPool } from './shared/config/database/connection';
import { errorHandler } from './shared/infrastructure/middleware/errorHandler';
import { corsMiddleware } from './shared/infrastructure/middleware/cors';

function bootstrap(): void {
  const app = express();

  app.use(corsMiddleware);
  app.use(express.json());

  const deps = { 
    pool: getPool(),
    jwtService: createJwtService(), 

   };

  const registry = createContainer();
  registry.mount(app, deps);

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