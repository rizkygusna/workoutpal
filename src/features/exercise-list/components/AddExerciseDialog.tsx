import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGetExercises } from '../api/get-exercises';
import { useStore } from '@/stores';
import UpdateExerciseForm from './UpdateExerciseForm';

interface IProps {
  open: boolean;
  // isLoading?: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
}

const AddExerciseDialog = ({
  open,
  handleClose,
  // isLoading = false,
  handleSubmit,
}: IProps) => {
  const { user } = useStore();
  const { data, isError, isFetching } = useGetExercises({
    params: { userId: user!.email },
    queryConfig: { enabled: open && !!user?.email },
  });

  return (
    <Dialog open={open} onOpenChange={() => handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Exercises</DialogTitle>
          <DialogDescription>Add exercises for your list.</DialogDescription>
        </DialogHeader>
        {isFetching ? (
          <p>Loading</p>
        ) : data?.length <= 0 ? (
          <p>Data empty</p>
        ) : (
          <UpdateExerciseForm
            onSubmit={function (): void {
              throw new Error('Function not implemented.');
            }}
            initialExercises={data ?? []}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddExerciseDialog;
