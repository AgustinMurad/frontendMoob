import api from "./axios";
import {
  LoginDto,
  RegisterDto,
  AuthResponse,
  ProfileResponse,
} from "../types/auth.types";

export const authService = {
  // POST /auth/register
  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  // POST /auth/login
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  // GET /auth/profile
  getProfile: async (): Promise<ProfileResponse> => {
    const response = await api.get<ProfileResponse>("/auth/profile");
    return response.data;
  },
};
