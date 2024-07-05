import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface IProps {
  open: boolean;
  handleClickOk: () => void;
  handleClose: () => void;
  isLoading: boolean;
}

const ConfirmationDialog = ({ open, isLoading, handleClickOk, handleClose }: IProps) => {
  return (
    <Dialog open={open} onOpenChange={() => handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isLoading} onClick={() => handleClickOk()}>
            {isLoading ? 'Loading..' : 'OK'}
          </Button>
          <Button variant="outline" disabled={isLoading} onClick={() => handleClose()}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
