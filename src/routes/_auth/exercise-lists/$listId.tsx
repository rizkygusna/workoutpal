import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { getExerciseListByIdQueryOptions } from '@/features/exercise-list/api/get-exercise-list-by-id';
import { useGetExerciseListExercises } from '@/features/exercise-list/api/get-exercise-list-exercises';
import { cn } from '@/lib/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { useEffect, Fragment } from 'react';

const ExerciseListExercises = () => {
  const { listId } = Route.useParams();
  const exerciseListByIdData = useSuspenseQuery(
    getExerciseListByIdQueryOptions({ listId })
  );

  const { data, isPending, isError } = useGetExerciseListExercises({ listId });

  useEffect(() => {
    if (isPending || !isError) return;
    alert('Error fetching exercise lists.');
  }, [isError, isPending]);

  return (
    <Card className="mx-4 sm:mx-0">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2">
            <CardTitle>{exerciseListByIdData.data.name} Exercises</CardTitle>
            <CardDescription>{exerciseListByIdData.data.description}</CardDescription>
          </div>
          <div>
            <Button onClick={() => {}}>
              <Plus className="mr-2 h-4 w-4" />
              Add Exercises
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <>
            <Skeleton className="w-full h-[48px] mx-2 my-4" />
            <Skeleton className="w-full h-[48px] mx-2 my-4" />
            <Skeleton className="w-full h-[48px] mx-2 my-4" />
          </>
        ) : (
          data?.map((exercise, index, array) => (
            <Fragment key={exercise.id}>
              <div
                className={cn(
                  'my-4',
                  index === array.length - 1 ? 'mb-0' : '',
                  index === 0 && 'mt-0'
                )}
              >
                {exercise.name}
              </div>
              {index < array.length - 1 && <Separator />}
            </Fragment>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export const Route = createFileRoute('/_auth/exercise-lists/$listId')({
  loader: async ({ context: { queryClient }, params: { listId } }) => {
    await queryClient.ensureQueryData(getExerciseListByIdQueryOptions({ listId }));
  },
  component: ExerciseListExercises,
});
