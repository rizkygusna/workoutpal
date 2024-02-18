import { User } from '@/features/auth';
import { StateCreator } from 'zustand';

export interface UserSlice {
  user: User | undefined;
  updateUser: (user: User) => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: undefined,
  updateUser: (user: User) => set(() => ({ user: user })),
});
