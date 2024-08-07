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
import { useGetExerciseListById } from '@/features/exercise-list/api/get-exercise-list-by-id';
import { useGetExerciseListExercises } from '@/features/exercise-list/api/get-exercise-list-exercises';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { useEffect, Fragment } from 'react';

const ExerciseListExercises = () => {
  const { listId } = Route.useParams();
  const {
    data: listData,
    isPending: listIsPending,
    isError: listIsError,
  } = useGetExerciseListById({ params: { listId } });
  const { data, isPending, isError } = useGetExerciseListExercises({ listId });

  useEffect(() => {
    if (isPending || !isError) return;
    alert('Error fetching exercise lists.');
  }, [isError, isPending]);

  useEffect(() => {
    if (listIsPending || !listIsError) return;
    alert('Error fetching exercise lists.');
  }, [listIsError, listIsPending]);

  return (
    <Card className="mx-4 sm:mx-0">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          {listIsPending ? (
            <div className="flex flex-col gap-2 flex-grow">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          ) : (
            <div className="flex flex-col gap-2 flex-grow">
              <CardTitle>{listData?.name} Exercises</CardTitle>
              <CardDescription>{listData?.description}</CardDescription>
            </div>
          )}
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
            <Skeleton className="w-full h-6 my-4" />
            <Separator />
            <Skeleton className="w-full h-6 my-4" />
            <Separator />
            <Skeleton className="w-full h-6 my-4" />
            <Separator />
            <Skeleton className="w-full h-6 my-4" />
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
  component: ExerciseListExercises,
});
