// DTOs basados en el Swagger JSON

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface User {
  userId: string;
  email: string;
  username: string;
}

export interface ProfileResponse {
  message: string;
  user: User;
}

export interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}
