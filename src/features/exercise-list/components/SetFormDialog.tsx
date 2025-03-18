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
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createSetFormSchema, TAddSet, useCreateExerciseSet } from '../api/create-set';
import { Route } from '@/routes/_auth/exercise-lists/$listId';

interface IProps {
  open: boolean;
  handleClose: () => void;
  selectedExerciseId: number | null;
}

const SetFormDialog = ({ open, handleClose, selectedExerciseId }: IProps) => {
  const { listId } = Route.useParams();
  const form = useForm<TAddSet>({
    resolver: zodResolver(createSetFormSchema),
    defaultValues: { weight: 2.5, repetition: 1 },
  });
  const { mutate, isPending } = useCreateExerciseSet({
    mutationConfig: {
      onSuccess: () => {
        form.reset();
        handleClose();
      },
    },
  });

  const handleChangeValue = (name: 'weight' | 'repetition', value: number) => {
    form.setValue(name, value);
  };

  const onSubmit = (data: TAddSet) => {
    if (!selectedExerciseId) return;
    mutate({ ...data, exerciseId: selectedExerciseId, listId: Number(listId) });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Set</DialogTitle>
          <DialogDescription>Add a new set to your exercise.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='className="max-h-[156px] flex flex-col gap-2'
          >
            <FormField
              control={form.control}
              name="repetition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repetition</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Repetition"
                      type="number"
                      min={1}
                      max={100}
                      value={field.value}
                      onChange={(e) =>
                        handleChangeValue('repetition', parseInt(e.target.value))
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <div className="flex flex-row items-center gap-2">
                      <Input
                        {...field}
                        placeholder="Weight"
                        type="number"
                        min={1}
                        value={field.value}
                        step={0.5}
                        onChange={(e) =>
                          handleChangeValue('weight', parseInt(e.target.value))
                        }
                      />
                      <FormDescription>Kg</FormDescription>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="!justify-center">
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Adding...' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SetFormDialog;
