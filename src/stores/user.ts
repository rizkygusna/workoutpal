import { User } from '@/features/auth';
import storage from '@/utils/storage';
import { StateCreator } from 'zustand';

export interface UserSlice {
  user: User | undefined;
  updateUser: (user: User) => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: storage.getUser(),
  updateUser: (user: User) => set(() => ({ user: user })),
});
