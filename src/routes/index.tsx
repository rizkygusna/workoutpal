import { getUser } from '@/features/auth';
import { useGetExerciseLists } from '@/features/exercise-list/api/get-exercise-lists';
import ExerciseCard from '@/features/exercise-list/components/ExerciseCard';
import storage from '@/utils/storage';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useEffect } from 'react';

const Home = () => {
  const user = storage.getUser();
  const { data, isLoading, isError } = useGetExerciseLists({
    params: { userId: user.email },
    queryConfig: { enabled: Boolean(user) },
  });

  useEffect(() => {
    if (isLoading || !isError) return;
    alert('Error fetching exercise lists.');
  }, [isError, isLoading]);

  return (
    <div className="max-w-screen-sm mx-auto p-4 sm:px-0">
      <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-3">
        Exercise Lists
      </h3>
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <h1>Loading..</h1>
        ) : (
          data?.map((exerciseList) => (
            <div key={exerciseList.id}>
              <ExerciseCard {...exerciseList} />
            </div>
          ))
        )}
      </div>
    </div>
  );
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
