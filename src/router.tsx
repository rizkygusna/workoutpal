import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { queryClient } from './lib/react-query';

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent', // routes will be preloaded by default when the user hovers over a link
  context: {
    // auth will initially be undefined
    // We'll be passing down the auth state from within a React component
    auth: undefined!,
    queryClient: queryClient,
  },
  defaultPreloadStaleTime: 0,
});
