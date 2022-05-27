import { Paper } from '@mui/material';
import './task.scss';
import { TaskData } from '../../../utils/types/types';
import RemoveTask from '../RemoveTask/RemoveTask';
import { Draggable } from 'react-beautiful-dnd';
import { useAppDispatch } from '../../../hooks';
import { openModal } from '../../../store/slices/modalSlice';
import EditTask from '../EditTask/EditTask';

const Task: React.FC<{ columnId: string; dataTask: TaskData; index: number }> = ({
  columnId,
  dataTask,
  index,
}) => {
  const { title } = dataTask;
  const dispatch = useAppDispatch();

  const openEditTaskModal = () => {
    dispatch(openModal({ open: true, contentModal: <EditTask {...dataTask} /> }));
  };

  return (
    <Draggable draggableId={dataTask.id} index={index}>
      {(provided) => (
        <Paper
          className="task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={openEditTaskModal}
        >
          <h2>{title}</h2>
          <RemoveTask columnId={columnId} dataTask={dataTask} />
        </Paper>
      )}
    </Draggable>
  );
};

export default Task;
