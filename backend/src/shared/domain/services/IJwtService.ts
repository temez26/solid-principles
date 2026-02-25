export interface JwtPayload {
  sub: string;
  email: string;
  username: string;
}

export interface IJwtService {
  sign(payload: JwtPayload): string;
  verify(token: string): JwtPayload;
}