import { User } from '@/features/auth';

const storage = {
  getToken: () => {
    return window.localStorage.getItem('token');
  },
  setToken: (token: string) => {
    window.localStorage.setItem('token', token);
  },
  clearToken: () => {
    window.localStorage.removeItem('token');
  },
  getUser: () => {
    const user = window.localStorage.getItem('user');
    return user ? JSON.parse(user) : undefined;
  },
  setUser: (user: User) => {
    window.localStorage.setItem('user', JSON.stringify(user));
  },
  clearUser: () => {
    window.localStorage.removeItem('user');
  },
};

export default storage;
