/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, DefaultOptions, UseMutationOptions } from '@tanstack/react-query';

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> = Awaited<
  ReturnType<FnType>
>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any) => Promise<any>> =
  UseMutationOptions<
    ApiFnReturnType<MutationFnType>,
    Error,
    Parameters<MutationFnType>[0]
  >;

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (
      attempt // add exponential backoff
    ) => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    throwOnError: true,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
