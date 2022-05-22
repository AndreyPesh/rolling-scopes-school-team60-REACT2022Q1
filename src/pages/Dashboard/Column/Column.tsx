import './column.scss';
import { Paper } from '@mui/material';
import { ColumnData } from '../../../utils/types/types';
import { useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import RemoveColumn from '../RemoveColumn/RemoveColumn';
import Task from '../Task/Task';

const Column = ({ title, id, tasks }: ColumnData) => {
  const {
    currentBoard: { boardData },
  } = useAppSelector((state: RootState) => state);
  const listTasks = tasks
    ? tasks.map((dataTask) => <Task key={dataTask.id} columnId={id} dataTask={dataTask} />)
    : [];

  return (
    <Paper className="column">
      <h2>{title}</h2>
      {tasks && <div className="column__list-tasks">{listTasks}</div>}
      <div className="column__buttons">
        <RemoveColumn boardId={boardData.id} columnId={id} title={title} />
      </div>
    </Paper>
  );
};

export default Column;
