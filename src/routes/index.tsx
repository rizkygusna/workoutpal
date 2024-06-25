import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getUser } from '@/features/auth';
import { useGetExerciseLists } from '@/features/exercise-list/api/get-exercise-lists';
import ExerciseCard from '@/features/exercise-list/components/ExerciseCard';
import storage from '@/utils/storage';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

const Home = () => {
  const user = storage.getUser();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetExerciseLists({
    params: { userId: user.email },
    queryConfig: { enabled: Boolean(user) },
  });

  useEffect(() => {
    if (isLoading || !isError) return;
    alert('Error fetching exercise lists.');
  }, [isError, isLoading]);

  return (
    <Card className="max-w-screen-sm mx-auto sm:px-0 mt-8">
      <CardHeader>
        <CardTitle>Exercise Lists</CardTitle>
        <CardDescription>List of your programs or exercises.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="w-[574px] h-[48px] px-2 py-4" />
            <Skeleton className="w-[574px] h-[48px] px-2 py-4" />
            <Skeleton className="w-[574px] h-[48px] px-2 py-4" />
          </div>
        ) : (
          data?.map((exerciseList) => (
            <ExerciseCard
              key={exerciseList.id}
              {...exerciseList}
              handleClick={() => navigate({ to: `/exerciseLists/${exerciseList.id}` })}
            ></ExerciseCard>
          ))
        )}
      </CardContent>
    </Card>
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
