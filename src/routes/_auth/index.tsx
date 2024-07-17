import ConfirmationDialog from '@/components/ConfirmationDialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ExerciseListFormSchema,
  useCreateExerciseList,
} from '@/features/exercise-list/api/create-exercise-list';
import { useDeleteExerciseList } from '@/features/exercise-list/api/delete-exercise-list';
import {
  ExerciseList,
  getExerciseListsQueryOptions,
} from '@/features/exercise-list/api/get-exercise-lists';
import { useUpdateExerciseList } from '@/features/exercise-list/api/update-exercise-list';
import ExerciseCard from '@/features/exercise-list/components/ExerciseCard';
import ExerciseListFormDialog from '@/features/exercise-list/components/ExerciseListFormDialog';
import { useStore } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const Home = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  const [openConfirmDialog, setopenConfirmDialog] = useState<boolean>(false);
  const [openExerciseListFormDialog, setOpenExerciseListFormDialog] =
    useState<boolean>(false);
  const selectedExerciseList = useRef<ExerciseList | null>(null);

  const { data, isLoading, isError } = useQuery(
    getExerciseListsQueryOptions({ userId: user!.email })
  );

  const { mutate: deleteExerciseList, isPending: isPendingDeleteExerciseList } =
    useDeleteExerciseList({
      mutationConfig: {
        onSuccess: () => {
          setopenConfirmDialog(false);
          selectedExerciseList.current = null;
        },
      },
    });

  const { mutate: createExerciseList, isPending: isPendingCreateExerciseList } =
    useCreateExerciseList({
      mutationConfig: {
        onSuccess: () => {
          setOpenExerciseListFormDialog(false);
        },
      },
    });

  const { mutate: updateExerciseList, isPending: isPendingUpdateExerciseList } =
    useUpdateExerciseList({
      mutationConfig: {
        onSuccess: () => {
          setOpenExerciseListFormDialog(false);
          selectedExerciseList.current = null;
        },
      },
    });

  const handleClickDelete = (exerciseList: ExerciseList) => {
    selectedExerciseList.current = exerciseList;
    setopenConfirmDialog(true);
  };

  const handleClickOk = () => {
    if (!selectedExerciseList.current) return;
    deleteExerciseList(selectedExerciseList.current.id);
  };

  const handleClickEdit = (exerciseList: ExerciseList) => {
    setOpenExerciseListFormDialog(true);
    selectedExerciseList.current = exerciseList;
  };

  const handleSubmit = (values: ExerciseListFormSchema) => {
    if (!user) return;
    if (selectedExerciseList.current) {
      updateExerciseList({
        exerciseListId: selectedExerciseList.current.id,
        params: values,
      });
    } else {
      createExerciseList({ ...values, userId: user.email });
    }
  };

  const handleCloseForm = () => {
    setOpenExerciseListFormDialog(false);
    selectedExerciseList.current = null;
  };

  useEffect(() => {
    if (isLoading || !isError) return;
    alert('Error fetching exercise lists.');
  }, [isError, isLoading]);

  return (
    <>
      <Card className="mx-4 sm:mx-0">
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-2">
              <CardTitle>Exercise Lists</CardTitle>
              <CardDescription>List of your programs or exercises.</CardDescription>
            </div>
            <div>
              <div>
                <Button onClick={() => setOpenExerciseListFormDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add List
                </Button>
              </div>
              <ExerciseListFormDialog
                open={openExerciseListFormDialog}
                handleClose={() => handleCloseForm()}
                handleSubmit={(values) => handleSubmit(values)}
                exerciseList={selectedExerciseList.current}
                isLoading={
                  selectedExerciseList.current
                    ? isPendingUpdateExerciseList
                    : isPendingCreateExerciseList
                }
              />
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
                handleClick={() => navigate({ to: `/exercise-lists/${exerciseList.id}` })}
                handleClickEdit={() => handleClickEdit(exerciseList)}
                handleClickDelete={() => handleClickDelete(exerciseList)}
              ></ExerciseCard>
            ))
          )}
        </CardContent>
      </Card>
      <ConfirmationDialog
        open={openConfirmDialog}
        isLoading={isPendingDeleteExerciseList}
        handleClickOk={handleClickOk}
        handleClose={() => setopenConfirmDialog(false)}
      />
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
