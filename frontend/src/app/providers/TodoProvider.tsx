import React from 'react';
import { TodoRepositoryProvider, useZustandTodoRepository } from '../../entities/todo';

/**
 * App-level provider that injects the concrete TodoRepository.
 * This is the ONLY place in the entire app that knows which
 * implementation is being used. Swap this one line to change
 * from REST API to localStorage, in-memory, or a test mock.
 */
export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const repository = useZustandTodoRepository();

  return (
    <TodoRepositoryProvider repository={repository}>
      {children}
    </TodoRepositoryProvider>
  );
};