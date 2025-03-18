import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const createSetFormSchema = z.object({
  weight: z.number().min(0).max(1000),
  repetition: z.number().min(1).max(100),
});

export type TAddSet = z.infer<typeof createSetFormSchema>;

export interface CreateSetParams extends TAddSet {
  listId: number;
  exerciseId: number;
}

export interface ExerciseSet {
  id: number;
  weight: number;
  repetition: number;
  dateCreated: string;
}

const createSet = (params: CreateSetParams): Promise<ExerciseSet> => {
  return axiosInstance.post('/sets', params);
};

type UseCreateExerciseSetOptions = {
  mutationConfig?: MutationConfig<typeof createSet>;
};

export const useCreateExerciseSet = ({
  mutationConfig,
}: UseCreateExerciseSetOptions = {}) => {
  return useMutation({ mutationFn: createSet, ...mutationConfig });
};
