import './column.scss';
import { Paper } from '@mui/material';
import { ColumnData } from '../../../utils/types/types';
import { useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import RemoveColumn from '../RemoveColumn/RemoveColumn';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../Task/Task';
import { sortItemByOrder } from '../../../utils/functions/sort';
import { NameDragAction } from '../../../utils/enum/enum';

const Column = ({ title, id, tasks }: ColumnData) => {
  const {
    currentBoard: { boardData },
  } = useAppSelector((state: RootState) => state);

  const listTasks = tasks
    ? Array.from(tasks)
        .sort(sortItemByOrder)
        .map((dataTask, index) => (
          <Task key={dataTask.id} columnId={id} dataTask={dataTask} index={index} />
        ))
    : [];

  return (
    <Droppable droppableId={id} type={NameDragAction.TASK}>
      {(provided) => (
        <Paper className="column" ref={provided.innerRef} {...provided.droppableProps}>
          <h2>{title}</h2>
          {tasks && <div className="column__list-tasks">{listTasks}</div>}
          <div className="column__buttons">
            <RemoveColumn boardId={boardData.id} columnId={id} title={title} />
          </div>
          {provided.placeholder}
        </Paper>
      )}
    </Droppable>
  );
};

export default Column;
