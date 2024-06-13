import { getUser } from '@/features/auth';
import { useStore } from '@/stores';
import storage from '@/utils/storage';
import { createFileRoute, redirect } from '@tanstack/react-router';

const Home = () => {
  const user = useStore((state) => state.user);
  console.log(user);
  //TODO: Put loader function from route to this component
  return <div>This is home page</div>;
};

export const Route = createFileRoute('/')({
  // beforeLoad: ({ context }) => {
  //   if (!context.auth) {
  //     throw redirect({
  //       to: '/login',
  //     });
  //   }
  // },
  loader: async ({ context }) => {
    if (!storage.getUser()) {
      throw redirect({
        to: '/login',
      });
    }
    const { email: userEmail } = storage.getUser();
    try {
      const data = await context.queryClient.ensureQueryData({
        queryKey: ['user', userEmail],
        queryFn: () => getUser(userEmail),
      });
      storage.setUser(data);
    } catch (error) {
      throw redirect({ to: '/login' });
    }
  },
  component: Home,
});
