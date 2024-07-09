import { axiosInstance } from '@/lib/axios';
import { ExerciseList } from './get-exercise-lists';
import { MutationConfig } from '@/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const exerciseListFormSchema = z.object({
  listName: z.string().min(2).max(50),
  description: z.string(),
});

export type ExerciseListFormSchema = z.infer<typeof exerciseListFormSchema>;

export interface CreateExerciseListParams extends ExerciseListFormSchema {
  userId: string;
}

const createExerciseList = (params: CreateExerciseListParams): Promise<ExerciseList> => {
  return axiosInstance.post('/exerciseLists', params);
};

type UseCreateExerciseListOptions = {
  mutationConfig?: MutationConfig<typeof createExerciseList>;
};

export const useCreateExerciseList = ({
  mutationConfig,
}: UseCreateExerciseListOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['exerciseLists'],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createExerciseList,
  });
};
