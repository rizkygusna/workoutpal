import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { ExerciseList } from './get-exercise-lists';

export const updateExerciseListInputSchema = z.object({
  listName: z.string().min(1, 'Required'),
  description: z.string().min(1).nullable(),
});

export type UpdateExerciseListParams = z.infer<typeof updateExerciseListInputSchema>;

// must have one parameter
export const updateExerciseList = ({
  exerciseListId,
  params,
}: {
  exerciseListId: string;
  params: UpdateExerciseListParams;
}): Promise<ExerciseList> => {
  return axiosInstance.put('/exerciseLists/' + exerciseListId, params);
};

type UseUpdateExerciseListOptions = {
  mutationConfig?: MutationConfig<typeof updateExerciseList>;
};

export const useCreateExerciseList = ({
  mutationConfig,
}: UseUpdateExerciseListOptions = {}) => {
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
    mutationFn: updateExerciseList,
  });
};
