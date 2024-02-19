import { createFileRoute, redirect } from '@tanstack/react-router';

const Home = () => {
  return <div>This is home page</div>;
};

export const Route = createFileRoute('/')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Home,
});
