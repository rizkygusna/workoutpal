import { axiosInstance } from '@/lib/axios';
import { Exercise } from './get-exercise-list-exercises';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';

interface GetExercisesParams {
  userId: string;
}

const getExercises = (params: GetExercisesParams): Promise<Exercise[]> => {
  return axiosInstance.get('/exercises', { params });
};

export const getExercisesQueryOptions = (params: GetExercisesParams) => {
  return queryOptions({
    queryKey: ['exercises', params],
    queryFn: () => getExercises(params),
    enabled: !!params.userId,
  });
};

type UseGetExercisesOptions = {
  params: GetExercisesParams;
  queryConfig?: QueryConfig<typeof getExercisesQueryOptions>;
};

export const useGetExercises = ({ params, queryConfig }: UseGetExercisesOptions) => {
  return useQuery({ ...getExercisesQueryOptions(params), ...queryConfig });
};
