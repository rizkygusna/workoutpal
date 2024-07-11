import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ExerciseList } from '../api/get-exercise-lists';
import {
  exerciseListFormSchema,
  ExerciseListFormSchema,
} from '../api/create-exercise-list';
import { useEffect } from 'react';

interface IProps {
  open: boolean;
  isLoading: boolean;
  exerciseList?: ExerciseList | null; // default values
  handleClose: () => void;
  handleSubmit: (values: ExerciseListFormSchema) => void;
}

const addDescriptionText = 'Add a new list of exercises.';
const editDescriptionText = 'Edit your list of exercises.';

function ExerciseListFormDialog({
  open,
  isLoading,
  exerciseList = null,
  handleClose,
  handleSubmit,
}: IProps) {
  const form = useForm<ExerciseListFormSchema>({
    resolver: zodResolver(exerciseListFormSchema),
    defaultValues: { listName: '', description: '' },
  });

  useEffect(() => {
    if (!exerciseList || !open) return;
    form.reset(
      {
        listName: exerciseList.name,
        description: exerciseList.description,
      },
      { keepDefaultValues: true }
    );
  }, [exerciseList, open, form]);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        handleClose();
        form.reset();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{exerciseList ? 'Edit list' : 'Add list'}</DialogTitle>
          <DialogDescription>
            {exerciseList ? editDescriptionText : addDescriptionText}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid gap-2 py-4">
              <FormField
                control={form.control}
                name="listName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-baseline gap-4">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input id="listName" className="col-span-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-baseline gap-4">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input id="description" className="col-span-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting..' : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ExerciseListFormDialog;
