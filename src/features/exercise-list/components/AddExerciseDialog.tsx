import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface IProps {
  open: boolean;
  isLoading?: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
}

const AddExerciseDialog = ({
  open,
  handleClose,
  isLoading = false,
  handleSubmit,
}: IProps) => {
  return (
    <Dialog open={open} onOpenChange={() => handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Exercises</DialogTitle>
          <DialogDescription>Add exercises for your list.</DialogDescription>
        </DialogHeader>
        {/* //TODO: integrate list of exercises */}
      </DialogContent>
    </Dialog>
  );
};

export default AddExerciseDialog;
