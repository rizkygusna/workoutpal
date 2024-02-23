import { createFileRoute, redirect } from '@tanstack/react-router';

const Home = () => {
  return <div>This is home page</div>;
};

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (!context.auth) {
      console.log(context.auth);
      throw redirect({
        to: '/login',
      });
    }
  },
  component: Home,
});
