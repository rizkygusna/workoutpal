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
import { useUpdateExerciseListExercises } from '@/features/exercise-list/api/update-exercise-list-exercises';
import ManageExerciseDialog from '@/features/exercise-list/components/ManageExerciseDialog';
import SetFormDialog from '@/features/exercise-list/components/SetFormDialog';
import { createFileRoute } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { useEffect, Fragment, useState, useRef } from 'react';

const ExerciseListExercises = () => {
  const { listId } = Route.useParams();
  const exerciseId = useRef<number | null>(null);
  const {
    data: listData,
    isPending: listIsPending,
    isError: listIsError,
  } = useGetExerciseListById({ params: { listId } });
  const { data, isPending, isError } = useGetExerciseListExercises({
    listId: parseInt(listId),
  });

  const { mutate } = useUpdateExerciseListExercises({
    mutationConfig: {
      onSuccess: () => {
        setopenAddExerciseDialog(false);
      },
    },
  });

  const [openAddExerciseDialog, setopenAddExerciseDialog] = useState<boolean>(false);
  const [openAddSetDialog, setopenAddSetDialog] = useState<boolean>(false);

  const handleSubmit = (values: { exercisesIds: number[] }) => {
    mutate({ exerciseIds: values.exercisesIds, listId: parseInt(listId) });
  };

  const handleAddSet = (selectedExerciseId: number) => {
    exerciseId.current = selectedExerciseId;
    setopenAddSetDialog(true);
  };

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
            <Button onClick={() => setopenAddExerciseDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Manage Exercises
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
              <div className="flex flex-row justify-between items-center ">
                <div>{exercise.name}</div>
                <Button variant="ghost" onClick={() => handleAddSet(exercise.id)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {index < array.length - 1 && <Separator className="my-2" />}
            </Fragment>
          ))
        )}
      </CardContent>
      <ManageExerciseDialog
        open={openAddExerciseDialog}
        handleClose={() => setopenAddExerciseDialog(false)}
        handleSubmit={handleSubmit}
        initExercises={data ?? []}
      />
      <SetFormDialog
        open={openAddSetDialog}
        handleClose={() => {
          exerciseId.current = null;
          setopenAddSetDialog(false);
        }}
        selectedExerciseId={exerciseId!.current}
      />
    </Card>
  );
};

export const Route = createFileRoute('/_auth/exercise-lists/$listId')({
  component: ExerciseListExercises,
});
