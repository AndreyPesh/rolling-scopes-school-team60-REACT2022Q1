import { Paper } from '@mui/material';
import './task.scss';
import { TaskData } from '../../../utils/types/types';
import RemoveTask from '../RemoveTask/RemoveTask';

const Task: React.FC<{ columnId: string; dataTask: TaskData }> = ({ columnId, dataTask }) => {
  const { title } = dataTask;
  return (
    <Paper className="task">
      <h2>{title}</h2>
      <RemoveTask columnId={columnId} dataTask={dataTask} />
    </Paper>
  );
};

export default Task;
