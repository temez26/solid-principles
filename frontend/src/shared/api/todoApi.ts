import { httpClient } from './httpClient';

export interface TodoDTO {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface ApiResponse<T> {
  data: T;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const json = await httpClient<ApiResponse<T>>(path, options);
  return json.data;
}

export const todoApi = {
  getAll: () => request<TodoDTO[]>('/todos'),

  create: (title: string) =>
    request<TodoDTO>('/todos', {
      method: 'POST',
      body: JSON.stringify({ title }),
    }),

  toggle: (id: string) => request<TodoDTO>(`/todos/${id}/toggle`, { method: 'PATCH' }),

  remove: (id: string) => request<void>(`/todos/${id}`, { method: 'DELETE' }),
};
