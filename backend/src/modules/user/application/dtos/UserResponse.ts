export interface UserResponse {
  id:        string;
  username:  string;
  email:     string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user:  UserResponse;
}

export interface RegisterResponse extends AuthResponse {}
export interface LoginResponse    extends AuthResponse {}