import type React from 'react';

import { TodoStoreProvider, todoStore } from '../../entities/todo';

/**
 * App-level provider that injects the concrete TodoRepository store.
 * This is the ONLY place in the entire app that knows which
 * store instance is being used. Swap todoStore to change
 * from REST API to localStorage, in-memory, or a test mock.
 */
export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <TodoStoreProvider store={todoStore}>{children}</TodoStoreProvider>;
};
