import { tokenStorage } from '../lib/tokenStorage';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

export interface TodoDTO {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface ApiResponse<T> {
  data: T;
}

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const token = tokenStorage.get();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    headers,
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;

  const json: ApiResponse<T> = await res.json();
  return json.data;
}

export const todoApi = {
  getAll: () => request<TodoDTO[]>('/todos'),

  create: (title: string) =>
    request<TodoDTO>('/todos', {
      method: 'POST',
      body: JSON.stringify({ title }),
    }),

  toggle: (id: string) =>
    request<TodoDTO>(`/todos/${id}/toggle`, { method: 'PATCH' }),

  remove: (id: string) =>
    request<void>(`/todos/${id}`, { method: 'DELETE' }),
};
