import { axiosInstance } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export interface Exercise {
  id: number;
  name: string;
}

const getExerciseListExercises = (listId: number): Promise<Exercise[]> => {
  return axiosInstance.get(`/exerciseLists/${listId}/exercises`);
};

export const getExerciseListExercisesQueryOptions = (listId: number) => {
  return queryOptions({
    queryKey: ['exerciseListExercises', listId],
    queryFn: () => getExerciseListExercises(listId),
    enabled: !!listId,
  });
};

type UseGetExerciseListExercises = {
  listId: number;
  queryConfig?: QueryConfig<typeof getExerciseListExercisesQueryOptions>;
};

export const useGetExerciseListExercises = ({
  listId,
  queryConfig,
}: UseGetExerciseListExercises) => {
  return useQuery({ ...getExerciseListExercisesQueryOptions(listId), ...queryConfig });
};
