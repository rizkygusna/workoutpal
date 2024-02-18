import { create } from 'zustand';
import { UserSlice, createUserSlice } from './user';

type IStore = UserSlice;

export const useStore = create<IStore>((...a) => ({
  ...createUserSlice(...a),
}));
