import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getExerciseListsQueryOptions } from '@/features/exercise-list/api/get-exercise-lists';
import { CreateExerciseListDialog } from '@/features/exercise-list/components/CreateExerciseListDialog';
import ExerciseCard from '@/features/exercise-list/components/ExerciseCard';
import { useStore } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

const Home = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(
    getExerciseListsQueryOptions({ userId: user!.email })
  );

  useEffect(() => {
    if (isLoading || !isError) return;
    alert('Error fetching exercise lists.');
  }, [isError, isLoading]);

  return (
    <>
      <Card className="mx-4 sm:mx-0">
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Exercise Lists</CardTitle>
              <CardDescription>List of your programs or exercises.</CardDescription>
            </div>
            <div>
              <CreateExerciseListDialog />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <>
              <Skeleton className="w-full h-[48px] mx-2 my-4" />
              <Skeleton className="w-full h-[48px] mx-2 my-4" />
              <Skeleton className="w-full h-[48px] mx-2 my-4" />
            </>
          ) : (
            data?.map((exerciseList) => (
              <ExerciseCard
                key={exerciseList.id}
                {...exerciseList}
                handleClick={() => navigate({ to: `/exerciseLists/${exerciseList.id}` })}
                handleClickEdit={() => console.log('Edit ', exerciseList.id)}
                handleClickDelete={() => console.log('Delete', exerciseList.id)}
              ></ExerciseCard>
            ))
          )}
        </CardContent>
      </Card>
    </>
  );
};

export const Route = createFileRoute('/_auth/')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: Home,
});
