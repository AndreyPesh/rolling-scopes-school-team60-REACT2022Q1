import { MouseEvent } from 'react';
import { Paper } from '@mui/material';
import './task.scss';
import { TaskData } from '../../../utils/types/types';
import RemoveTask from '../RemoveTask/RemoveTask';
import { Draggable } from 'react-beautiful-dnd';
import EditTask from '../EditTask/EditTask';
import { useAppDispatch } from '../../../hooks';
import { openModal } from '../../../store/slices/modalSlice';
import ShowTask from '../ShowTask/ShowTask';
import { NAME_DATA_ATRR_SHOW_TASK } from '../../../utils/constants';

const Task: React.FC<{ columnId: string; dataTask: TaskData; index: number }> = ({
  columnId,
  dataTask,
  index,
}) => {
  const { title } = dataTask;
  const dispatch = useAppDispatch();
  const showTask = (event: MouseEvent<HTMLDivElement>) => {
    const { target } = event;
    if ((target as Element).getAttribute(NAME_DATA_ATRR_SHOW_TASK)) {
      dispatch(openModal({ open: true, contentModal: <ShowTask /> }));
    }
  };
  return (
    <Draggable draggableId={dataTask.id} index={index}>
      {(provided) => (
        <Paper
          className="task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          data-show="task"
          onClick={showTask}
        >
          <h2 data-show="task">{title}</h2>
          <span>
            <EditTask columnId={columnId} dataTask={dataTask} />
            <RemoveTask columnId={columnId} dataTask={dataTask} />
          </span>
        </Paper>
      )}
    </Draggable>
  );
};

export default Task;
