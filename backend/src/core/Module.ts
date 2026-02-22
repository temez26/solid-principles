import type { Router } from 'express';
import type { Pool } from 'pg';

/**
 * DIP: High-level modules depend on this abstraction.
 * Each feature module implements this contract.
 */
export interface IModule {
  /** URL prefix, e.g. '/api/todos' */
  readonly path: string;
  /** Called once at startup; receives shared infrastructure (DB pool, etc.) */
  register(deps: ModuleDeps): void;
  /** Returns the module's Express router */
  getRouter(): Router;
}

/** Shared infrastructure passed to every module */
export interface ModuleDeps {
  pool: Pool;
}