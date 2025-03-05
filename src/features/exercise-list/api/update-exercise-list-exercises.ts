import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateExerciseListExercisesParams {
  exerciseIds: number[];
  listId: number;
}

export const updateExerciseListExercises = async (
  params: UpdateExerciseListExercisesParams
): Promise<{ message: string }> => {
  return axiosInstance.put(`/exerciseLists/${params.listId}/exercises`, {
    exerciseIds: params.exerciseIds,
  });
};

type UseUpdateExerciseListExercises = {
  mutationConfig?: MutationConfig<typeof updateExerciseListExercises>;
};

export const useUpdateExerciseListExercises = ({
  mutationConfig,
}: UseUpdateExerciseListExercises = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: ['exerciseListExercises', args[0].listId],
      });
      alert('Exercise list updated successfully');
      onSuccess?.(data, ...args);
    },
    onError: (error) => {
      alert('Failed to update exercise list');
      console.log(error);
    },
    ...restConfig,
    mutationFn: updateExerciseListExercises,
  });
};
