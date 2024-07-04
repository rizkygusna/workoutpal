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
import { useStore } from '@/stores';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateExerciseList } from '../api/create-exercise-list';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string(),
});

export function CreateExerciseListDialog() {
  const user = useStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateExerciseList({
    mutationConfig: {
      onSuccess: () => {
        setOpen(false);
      },
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      listName: values.name,
      description: values.description,
      userId: user!.email,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input id="name" className="col-span-3" {...field} />
                    </FormControl>
                    {/* <FormDescription>Your list name.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input id="description" className="col-span-3" {...field} />
                    </FormControl>
                    {/* <FormDescription>Your list description.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Submitting..' : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
