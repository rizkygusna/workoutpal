import { Exercise } from '../api/get-exercise-list-exercises';
import { Form, useForm } from 'react-hook-form';
import { FormField, FormItem } from '@/components/ui/form';

interface IProps {
  onSubmit: () => void;
  initialExercises: Exercise[];
}

const UpdateExerciseForm = ({ initialExercises, onSubmit }: IProps) => {
  const form = useForm();

  return (
    <Form {...form}>
      <FormField name="exercises" render={() => <FormItem></FormItem>} />
    </Form>
  );
};

export default UpdateExerciseForm;
