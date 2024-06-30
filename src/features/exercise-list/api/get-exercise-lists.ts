import { axiosInstance } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export interface ExerciseList {
  id: string;
  name: string;
  description: string;
}

interface GetExerciseListsParams {
  userId: string;
}

const getExerciseLists = (params: GetExerciseListsParams): Promise<ExerciseList[]> => {
  return axiosInstance.get('/exerciseLists', { params });
};

export const getExerciseListsQueryOptions = (params: GetExerciseListsParams) => {
  return queryOptions({
    queryKey: ['exerciseLists', params],
    queryFn: () => getExerciseLists(params),
    enabled: !!params.userId,
  });
};

type UseExerciseListsOptions = {
  params: GetExerciseListsParams;
  queryConfig?: QueryConfig<typeof getExerciseListsQueryOptions>;
};

export const useGetExerciseLists = ({ params, queryConfig }: UseExerciseListsOptions) => {
  return useQuery({
    ...getExerciseListsQueryOptions(params),
    ...queryConfig,
  });
};
