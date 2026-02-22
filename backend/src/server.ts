import express from 'express';
import { config } from './config';
import { createContainer } from './container';
import { createTodoRoutes } from './interfaces/routes/todoRoutes';
import { errorHandler } from './interfaces/middleware/errorHandler';
import { corsMiddleware } from './interfaces/middleware/cors';

function bootstrap(): void {
  const app = express();

  // Middleware
  app.use(corsMiddleware);
  app.use(express.json());

  // Dependency Injection
  const { todoController } = createContainer();

  // Routes
  app.use('/api/todos', createTodoRoutes(todoController));

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Error handler (must be last)
  app.use(errorHandler);

  // Start
  app.listen(config.port, () => {
    console.log(`\n🚀 Server running at http://localhost:${config.port}`);
    console.log(`📋 Todos API: http://localhost:${config.port}/api/todos`);
    console.log(`💚 Health:    http://localhost:${config.port}/api/health\n`);
  });
}

bootstrap();