import React, { createContext, useContext } from 'react';
import type { TodoRepository } from './repository';

const TodoRepositoryContext = createContext<TodoRepository | null>(null);

export const useTodoRepository = (): TodoRepository => {
  const repo = useContext(TodoRepositoryContext);
  if (!repo) {
    throw new Error('useTodoRepository must be used within a TodoRepositoryProvider');
  }
  return repo;
};

interface Props {
  repository: TodoRepository;
  children: React.ReactNode;
}

export const TodoRepositoryProvider: React.FC<Props> = ({ repository, children }) => {
  return (
    <TodoRepositoryContext.Provider value={repository}>
      {children}
    </TodoRepositoryContext.Provider>
  );
};