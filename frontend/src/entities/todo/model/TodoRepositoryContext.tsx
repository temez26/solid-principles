import type React from 'react';
import { createContext, useContext } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import type { StoreApi } from 'zustand/vanilla';

import type { TodoRepository, TodoState, TodoActions } from './repository';

const TodoStoreContext = createContext<StoreApi<TodoRepository> | null>(null);

function useTodoStore(): StoreApi<TodoRepository> {
  const store = useContext(TodoStoreContext);
  if (!store) {
    throw new Error('useTodoStore must be used within a TodoStoreProvider');
  }
  return store;
}

/** Subscribe to todo state only — re-renders only when state changes */
export function useTodoState(): TodoState {
  return useStore(
    useTodoStore(),
    useShallow((s) => ({
      todos: s.todos,
      loading: s.loading,
      error: s.error,
    }))
  );
}

/** Subscribe to todo actions only — never re-renders (actions are stable) */
export function useTodoActions(): TodoActions {
  return useStore(
    useTodoStore(),
    useShallow((s) => ({
      fetchAll: s.fetchAll,
      add: s.add,
      remove: s.remove,
      toggle: s.toggle,
    }))
  );
}

/** Full repository access (backward compat) — re-renders on any change */
export function useTodoRepository(): TodoRepository {
  return useStore(useTodoStore());
}

interface Props {
  store: StoreApi<TodoRepository>;
  children: React.ReactNode;
}

export const TodoStoreProvider: React.FC<Props> = ({ store, children }) => {
  return <TodoStoreContext.Provider value={store}>{children}</TodoStoreContext.Provider>;
};
