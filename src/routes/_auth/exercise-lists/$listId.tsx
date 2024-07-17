import { useGetExerciseListExercises } from '@/features/exercise-list/api/get-exercise-list-exercises';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

const ExerciseListExercises = () => {
  const { listId } = Route.useParams();
  const { data, isPending, isError } = useGetExerciseListExercises({ listId });

  useEffect(() => {
    if (isPending || !isError) return;
    alert('Error fetching exercise lists.');
  }, [isError, isPending]);

  return (
    <div>
      <h1>{`exercise list exercises ${listId}`}</h1>
      {isPending ? <p>Loading..</p> : null}
    </div>
  );
};

export const Route = createFileRoute('/_auth/exercise-lists/$listId')({
  component: ExerciseListExercises,
});
