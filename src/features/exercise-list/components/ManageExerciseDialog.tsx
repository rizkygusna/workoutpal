import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGetExercises } from '../api/get-exercises';
import { useStore } from '@/stores';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Exercise } from '../api/get-exercise-list-exercises';
import { useEffect } from 'react';

interface IProps {
  open: boolean;
  initExercises?: Exercise[];
  handleClose: () => void;
  handleSubmit: (values: TUpdateExerciseListExercises) => void;
}

const FormSchema = z.object({
  exercisesIds: z.array(z.number().min(1)).nonempty(),
});

export type TUpdateExerciseListExercises = z.infer<typeof FormSchema>;

const ManageExerciseDialog = ({
  open,
  handleClose,
  handleSubmit: onSubmit,
  initExercises = [],
}: IProps) => {
  const { user } = useStore();
  const { data } = useGetExercises({
    params: { userId: user!.email },
    queryConfig: { enabled: open && !!user?.email },
  });
  const defaultValues = initExercises.map((exercise) => exercise.id);

  const form = useForm<TUpdateExerciseListExercises>({
    resolver: zodResolver(FormSchema),
    defaultValues: { exercisesIds: defaultValues },
  });

  // Update default value when init exercise changes
  useEffect(() => {
    form.reset({ exercisesIds: defaultValues });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initExercises, form]);

  return (
    <Dialog open={open} onOpenChange={() => handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Exercises</DialogTitle>
          <DialogDescription>Add exercises for your list.</DialogDescription>
        </DialogHeader>
        {data && (
          <Form {...form}>
            <div className="max-h-[156px] overflow-y-scroll">
              <FormField
                control={form.control}
                name="exercisesIds"
                render={() => (
                  <FormItem>
                    {data.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="exercisesIds"
                        render={({ field }) => (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== item.id)
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.name}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
              Submit
            </Button>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ManageExerciseDialog;
