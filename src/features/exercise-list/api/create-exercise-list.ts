import { axiosInstance } from '@/lib/axios';
import { ExerciseList } from './get-exercise-lists';
import { MutationConfig } from '@/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface CreateExerciseListParams {
  listName: string;
  description: string;
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
