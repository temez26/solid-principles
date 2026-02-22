import { create } from 'zustand';
import type { Todo } from './types';
import type { TodoRepository } from './repository';
import { todoApi } from '../../../shared/api/todoApi';

interface TodoState extends TodoRepository {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
}

function dtoToTodo(dto: { id: string; title: string; completed: boolean; createdAt: string }): Todo {
  return {
    id: dto.id,
    title: dto.title,
    completed: dto.completed,
    createdAt: new Date(dto.createdAt).getTime(),
  };
}

export const useTodoStore = create<TodoState>()((set, get) => ({
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

  async update(id: string, changes: Partial<Omit<Todo, 'id'>>) {
    // For now, handle locally — extend API later if needed
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, ...changes } : t,
      ),
    }));
  },
}));