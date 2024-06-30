import Header from '@/components/Header';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

const AuthLayout = () => {
  return (
    <div className="max-w-screen-sm mx-auto">
      <Header />
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: AuthLayout,
});
