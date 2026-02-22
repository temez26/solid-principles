import { ModuleRegistry } from './ModuleRegistry';
import { TodoModule } from '../modules/todo/TodoModule';

/**
 * Composition Root.
 * To add a new feature: import its Module and call .register().
 * Nothing else changes.
 *
 * Example:
 *   registry.register(new UserModule());
 *   registry.register(new AuthModule());
 */
export function createContainer(): ModuleRegistry {
  return new ModuleRegistry()
    .register(new TodoModule());
    // .register(new UserModule())   ← adding future modules is this simple
    // .register(new AuthModule())
}