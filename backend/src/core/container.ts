import { ModuleRegistry } from './ModuleRegistry';
import { TodoModule } from '../modules/todo/TodoModule';
import { UserModule } from '../modules/user/UserModule'

/**
 * Composition Root.
 * To add a new feature: import its Module and call .register().
 * Nothing else changes.
 *
 * Example:
 *   register(new UserModule());
 *   register(new AuthModule());
 */
export function createContainer(): ModuleRegistry {
  return new ModuleRegistry()
    .register(new TodoModule())
    .register(new UserModule());
}