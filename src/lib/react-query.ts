import { QueryClient, DefaultOptions } from '@tanstack/react-query';

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
