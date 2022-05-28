import './show-task.scss';
import { useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import { TaskData } from '../../../utils/types/types';

const ShowTask: React.FC<{ columnId: string; dataTask: TaskData }> = ({ columnId, dataTask }) => {
  const {
    currentBoard: {
      boardData: { columns },
    },
  } = useAppSelector((state: RootState) => state);
  const currentColumn = columns.find((column) => column.id === columnId);
  return (
    <div className="show-task">
      <h3>Column: {currentColumn?.title}</h3>
      <h3>Task: {dataTask.title}</h3>
      <p>
        <b>Description:</b> {dataTask.description}
      </p>
    </div>
  );
};

export default ShowTask;
