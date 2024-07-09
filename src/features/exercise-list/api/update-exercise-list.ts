import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExerciseList } from './get-exercise-lists';
import { getExerciseListByIdQueryOptions } from './get-exercise-list-by-id';
import { ExerciseListFormSchema } from './create-exercise-list';

interface UpdateExerciseListParams {
  exerciseListId: string;
  params: ExerciseListFormSchema;
}

// must have one parameter
export const updateExerciseList = ({
  exerciseListId,
  params,
}: UpdateExerciseListParams): Promise<ExerciseList> => {
  return axiosInstance.put('/exerciseLists/' + exerciseListId, params);
};

type UseUpdateExerciseListOptions = {
  mutationConfig?: MutationConfig<typeof updateExerciseList>;
};

export const useUpdateExerciseList = ({
  mutationConfig,
}: UseUpdateExerciseListOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getExerciseListByIdQueryOptions({ listId: data.id }).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateExerciseList,
  });
};
