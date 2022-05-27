import { Paper } from '@mui/material';
import './task.scss';
import { TaskData } from '../../../utils/types/types';
import RemoveTask from '../RemoveTask/RemoveTask';
import { Draggable } from 'react-beautiful-dnd';

const Task: React.FC<{ columnId: string; dataTask: TaskData; index: number }> = ({
  columnId,
  dataTask,
  index,
}) => {
  const { title } = dataTask;
  return (
    <Draggable draggableId={dataTask.id} index={index}>
      {(provided) => (
        <Paper
          className="task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h2>{title}</h2>
          <RemoveTask columnId={columnId} dataTask={dataTask} />
        </Paper>
      )}
    </Draggable>
  );
};

export default Task;
