import { createStore } from 'zustand/vanilla';

import { todoApi } from '../../../shared/api/todoApi';

import type { TodoRepository } from './repository';
import type { Todo } from './types';

function dtoToTodo(dto: {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}): Todo {
  return {
    id: dto.id,
    title: dto.title,
    completed: dto.completed,
    createdAt: new Date(dto.createdAt).getTime(),
  };
}

/**
 * Factory for creating a TodoRepository store.
 * Use createTodoStore() in tests to get an isolated instance.
 */
export function createTodoStore() {
  return createStore<TodoRepository>()((set) => ({
    todos: [],
    loading: false,
    error: null,

    async fetchAll() {
      set({ loading: true, error: null });
      try {
        const dtos = await todoApi.getAll();
        set({ todos: dtos.map(dtoToTodo), loading: false });
      } catch (err) {
        set({ error: (err as Error).message, loading: false });
      }
    },

    async add(title: string) {
      try {
        const dto = await todoApi.create(title);
        const created = dtoToTodo(dto);
        set((state) => ({ todos: [created, ...state.todos] }));
      } catch (err) {
        set({ error: (err as Error).message });
      }
    },

    async remove(id: string) {
      try {
        await todoApi.remove(id);
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        }));
      } catch (err) {
        set({ error: (err as Error).message });
      }
    },

    async toggle(id: string) {
      try {
        const dto = await todoApi.toggle(id);
        const updated = dtoToTodo(dto);
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? updated : t)),
        }));
      } catch (err) {
        set({ error: (err as Error).message });
      }
    },
  }));
}

/** Default app-wide store instance */
export const todoStore = createTodoStore();
