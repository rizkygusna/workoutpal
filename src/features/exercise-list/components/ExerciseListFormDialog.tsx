import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
// import { useStore } from '@/stores';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ExerciseList } from '../api/get-exercise-lists';
import {
  exerciseListFormSchema,
  ExerciseListFormSchema,
} from '../api/create-exercise-list';
// import { useCreateExerciseList } from '../api/create-exercise-list';

interface IProps {
  open: boolean;
  isLoading: boolean;
  exerciseList?: ExerciseList | null;
  handleClose: () => void;
  handleSubmit: (values: ExerciseListFormSchema) => void;
}

function ExerciseListFormDialog({
  open,
  isLoading,
  exerciseList = null,
  handleClose,
  handleSubmit,
}: IProps) {
  const form = useForm<ExerciseListFormSchema>({
    resolver: zodResolver(exerciseListFormSchema),
    defaultValues: exerciseList
      ? {
          listName: exerciseList.name,
          description: exerciseList.description,
        }
      : { listName: '', description: '' },
  });

  return (
    <Dialog open={open} onOpenChange={() => handleClose()}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add List
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add list</DialogTitle>
          <DialogDescription>Add a new list of exercises.</DialogDescription>
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
