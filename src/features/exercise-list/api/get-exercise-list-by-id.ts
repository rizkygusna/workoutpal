import { axiosInstance } from '@/lib/axios';
import { ExerciseList } from './get-exercise-lists';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';

interface GetExerciseListByIdParams {
  listId: string;
}

const getExerciseListById = (
  params: GetExerciseListByIdParams
): Promise<ExerciseList> => {
  return axiosInstance.get('/exerciseLists/' + params.listId);
};

export const getExerciseListByIdQueryOptions = (params: GetExerciseListByIdParams) => {
  return queryOptions({
    queryKey: ['exerciseList', params],
    queryFn: () => getExerciseListById(params),
  });
};

type UseExerciseListByIdOptions = {
  params: GetExerciseListByIdParams;
  queryConfig?: QueryConfig<typeof getExerciseListByIdQueryOptions>;
};

export const useGetExerciseListById = ({
  params,
  queryConfig,
}: UseExerciseListByIdOptions) => {
  return useQuery({
    ...getExerciseListByIdQueryOptions(params),
    ...queryConfig,
  });
};
