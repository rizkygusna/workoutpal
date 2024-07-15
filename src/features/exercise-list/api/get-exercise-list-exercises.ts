import { axiosInstance } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { queryOptions, useQuery } from '@tanstack/react-query';

interface Exercise {
  id: string;
  name: string;
}

const getExerciseListExercises = (listId: string): Promise<Exercise[]> => {
  return axiosInstance.get(`/exerciseLists/${listId}/exercises`);
};

export const getExerciseListExercisesQueryOptions = (listId: string) => {
  return queryOptions({
    queryKey: ['exerciseListExercises', listId],
    queryFn: () => getExerciseListExercises(listId),
    enabled: !!listId,
  });
};

type UseGetExerciseListExercises = {
  listId: string;
  queryConfig?: QueryConfig<typeof getExerciseListExercisesQueryOptions>;
};

export const useGetExerciseListExercises = ({
  listId,
  queryConfig,
}: UseGetExerciseListExercises) => {
  return useQuery({ ...getExerciseListExercisesQueryOptions(listId), ...queryConfig });
};
