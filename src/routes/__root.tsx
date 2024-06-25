import { User } from '@/features/auth';
import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: User | undefined;
  queryClient: QueryClient;
}

const notFoundComponent = () => (
  <div className="flex justify-center items-center w-full h-svh">
    <h1>404 Not Found</h1>,
  </div>
);

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div className="root-route">
      <Outlet />
    </div>
  ),
  notFoundComponent: notFoundComponent,
});
