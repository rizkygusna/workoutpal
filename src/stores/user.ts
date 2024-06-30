import { User } from '@/features/auth';
import storage from '@/utils/storage';
import { StateCreator } from 'zustand';

export interface UserSlice {
  user: User | undefined;
  isAuthenticated: boolean;
  updateUser: (user: User | undefined) => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: storage.getUser(),
  isAuthenticated: !!storage.getUser(),
  updateUser: (user: User | undefined) => set(() => ({ user: user })),
});
