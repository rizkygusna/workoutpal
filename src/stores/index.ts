import { create } from 'zustand';
import { UserSlice, createUserSlice } from './user';
import { devtools } from 'zustand/middleware';

type IStore = UserSlice;

export const useStore = create<IStore>()(
  devtools((...a) => ({
    ...createUserSlice(...a),
  }))
);
