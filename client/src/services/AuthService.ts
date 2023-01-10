import api from '../http';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../types/httpTypes';

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/users/login', { email, password });
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/users/registration', {
      email,
      password,
    });
  }

  static async logout(): Promise<any> {
    return api.post('/users/logout');
  }

  static async refresh(): Promise<any> {
    return api.get('/users/refresh');
  }
}
