import { axiosInstance } from '@/lib/axios';
import { ExerciseList } from './get-exercise-lists';
import { MutationConfig } from '@/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const createExerciseListInputSchema = z.object({
  listName: z.string().min(1, 'Required'),
  description: z.string().min(1).nullable(),
  userId: z.string().min(1, 'Required'),
});

export type CreateExerciseListParams = z.infer<typeof createExerciseListInputSchema>;

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
