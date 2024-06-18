import { ExerciseList } from '../api/get-exercise-lists';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface IProps extends ExerciseList {}

const ExerciseCard = ({ id, name, description }: IProps) => {
  return (
    <Card key={id}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ExerciseCard;
