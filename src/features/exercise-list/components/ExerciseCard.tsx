import { ExerciseList } from '../api/get-exercise-lists';
import { EllipsisVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface IProps extends ExerciseList {
  handleClick: () => void;
  handleClickEdit: () => void;
  handleClickDelete: () => void;
}

const ExerciseCard = ({
  name,
  description,
  handleClick,
  handleClickDelete,
  handleClickEdit,
}: IProps) => {
  return (
    <div className="flex flex-row justify-between px-2 py-4 hover:cursor-pointer">
      <div
        onClick={() => {
          handleClick();
        }}
        className="flex-1"
      >
        <h3 className="text-xl">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleClickEdit()}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClickDelete()}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ExerciseCard;
