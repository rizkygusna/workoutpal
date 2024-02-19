import { NotFoundRoute, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { Route as rootRoute } from './routes/__root.tsx';

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => '404 Not Found',
});

export const router = createRouter({
  routeTree,
  notFoundRoute,
  defaultPreload: 'intent', // routes will be preloaded by default when the user hovers over a link
  context: {
    // auth will initially be undefined
    // We'll be passing down the auth state from within a React component
    auth: undefined!,
  },
});
