import { Button } from '@/components/ui/button';
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
      <div className="max-w-screen-sm mx-auto">
        <div className="mx-4 flex justify-between py-4 sm:mx-0">
          <div className="flex flex-col justify-center">
            <h3 className="text-xl">WorkoutPal</h3>
          </div>
          <Button size="sm">Logout</Button>
        </div>
      </div>
      <div className="max-w-screen-sm mx-auto pt-8">
        <Outlet />
      </div>
    </div>
  ),
  notFoundComponent: notFoundComponent,
});
