import { httpClient } from './httpClient';

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponseDTO {
  token: string;
  user: UserDTO;
}

interface AuthApiResponse<T> {
  user: T;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const json = await httpClient<AuthApiResponse<T>>(path, options);
  return json.user;
}

export const authApi = {
  register: (username: string, email: string, password: string) =>
    request<AuthResponseDTO>('/users/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    }),

  login: (email: string, password: string) =>
    request<AuthResponseDTO>('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => httpClient<UserDTO>('/users/me'),
};
