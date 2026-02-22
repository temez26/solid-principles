import type { Express } from 'express';
import type { IModule, ModuleDeps } from './Module';

/**
 * OCP: Open for extension (add new modules) — closed for modification.
 * Server never needs to change when a new module is added.
 */
export class ModuleRegistry {
  private readonly modules: IModule[] = [];

  register(module: IModule): this {
    this.modules.push(module);
    return this; // fluent API
  }

  /** Wire all modules into Express */
  mount(app: Express, deps: ModuleDeps): void {
    for (const mod of this.modules) {
      mod.register(deps);
      app.use(mod.path, mod.getRouter());
      console.log(`  ✅ Module mounted: ${mod.path}`);
    }
  }
}