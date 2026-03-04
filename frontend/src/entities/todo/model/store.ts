import { create } from 'zustand';
import type { Todo } from './types';
import type { TodoRepository } from './repository';
import { todoApi } from '../../../shared/api/todoApi';

function dtoToTodo(dto: { id: string; title: string; completed: boolean; createdAt: string }): Todo {
  return {
    id: dto.id,
    title: dto.title,
    completed: dto.completed,
    createdAt: new Date(dto.createdAt).getTime(),
  };
}

/**
 * Concrete implementation of TodoRepository using Zustand + REST API.
 * This is the ONLY place that knows about Zustand and the API.
 * All consumers depend on the TodoRepository abstraction via Context.
 */
const useTodoStoreInternal = create<TodoRepository>()((set, get) => ({
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

  getAll(): Todo[] {
    return get().todos;
  },

  async add(todo: Todo) {
    try {
      const dto = await todoApi.create(todo.title);
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

  update(id: string, changes: Partial<Omit<Todo, 'id'>>) {
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, ...changes } : t,
      ),
    }));
  },
}));

/**
 * Hook that bridges Zustand store to TodoRepository interface.
 * Used ONLY by the TodoRepositoryProvider in app layer.
 */
export const useZustandTodoRepository = (): TodoRepository => {
  return useTodoStoreInternal();
};