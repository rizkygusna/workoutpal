import { User } from '@/features/auth';

const prefix = 'workoutpal_';

const storage = {
  getToken: () => {
    return window.localStorage.getItem(prefix + 'token');
  },
  setToken: (token: string) => {
    window.localStorage.setItem(prefix + 'token', token);
  },
  clearToken: () => {
    window.localStorage.removeItem(prefix + 'token');
  },
  getUser: () => {
    const user = window.localStorage.getItem(prefix + 'user');
    return user ? JSON.parse(user) : undefined;
  },
  setUser: (user: User) => {
    window.localStorage.setItem(prefix + 'user', JSON.stringify(user));
  },
  clearUser: () => {
    window.localStorage.removeItem(prefix + 'user');
  },
};

export default storage;
