import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { NotFoundRoute, RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { Route as rootRoute } from './routes/__root.tsx';

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => '404 Not Found',
});

// Set up a Router instance
const router = createRouter({
  routeTree,
  notFoundRoute,
  defaultPreload: 'intent', // routes will be preloaded by default when the user hovers over a link
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const InnerApp = () => {
  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <InnerApp />
  </React.StrictMode>
);
