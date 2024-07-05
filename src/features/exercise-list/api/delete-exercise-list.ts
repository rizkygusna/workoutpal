import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const deleteExerciseList = (listId: string) => {
  return axiosInstance.delete('/exerciseLists/' + listId);
};

type UseDeleteExerciseListOptions = {
  mutationConfig?: MutationConfig<typeof deleteExerciseList>;
};

export const useDeleteExerciseList = ({
  mutationConfig,
}: UseDeleteExerciseListOptions = {}) => {
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
    mutationFn: deleteExerciseList,
  });
};
