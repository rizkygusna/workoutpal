import { useState } from 'react';
import { ExerciseList } from '../api/get-exercise-lists';
import { EllipsisVertical } from 'lucide-react';

interface IProps extends ExerciseList {
  handleClick: () => void;
}

const ExerciseCard = ({ name, description, handleClick }: IProps) => {
  const [isHovered, setisHovered] = useState<boolean>(false);

  return (
    <div
      className="flex flex-row justify-between px-2 py-4 hover:cursor-pointer"
      onMouseOver={() => setisHovered(true)}
      onMouseOut={() => setisHovered(false)}
    >
      <div
        onClick={() => {
          handleClick();
        }}
        className="flex-1"
      >
        <h3 className="text-xl">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {isHovered ? (
        <div className="flex flex-col justify-center">
          <button
            onClick={() => {
              console.log('options clicked');
            }}
          >
            <EllipsisVertical />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ExerciseCard;
