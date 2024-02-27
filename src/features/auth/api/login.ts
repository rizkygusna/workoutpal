import { axiosInstance } from '@/lib/axios';
import { User } from '../types';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export type UserResponse = {
  token: string;
  user: User;
};

export const loginWithEmailAndPassword = (
  data: LoginCredentialsDTO
): Promise<UserResponse> => {
  return axiosInstance.post('/auth/login', data);
};

export const getUser = (email: string): Promise<User> => {
  return axiosInstance.get(`/auth/user?email=${email}`);
};
