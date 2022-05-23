import './column.scss';
import { Paper } from '@mui/material';
import { ColumnData, RequestUpdateTask, TaskData } from '../../../utils/types/types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import RemoveColumn from '../RemoveColumn/RemoveColumn';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Task from '../Task/Task';
import { sortTask } from '../../../utils/functions/sort';
import { fetchUpdateBoardDataById } from '../../../store/slices/currentBoardSlice';
import { useEffect, useState } from 'react';
import { updateTaskList } from '../../../utils/functions/api';

const Column = ({ title, id, tasks }: ColumnData) => {
  const {
    user,
    auth: { token },
    currentBoard: { boardData },
  } = useAppSelector((state: RootState) => state);
  const [localTasks, setLocalTasks] = useState<TaskData[]>(tasks);
  const [fetchDataUpdateTaskOrder, setFetchDataUpdateTaskOrder] = useState<RequestUpdateTask>();
  const dispatch = useAppDispatch();
  const listTasks = tasks
    ? Array.from(localTasks)
        .sort(sortTask)
        .map((dataTask, index) => (
          <Task key={dataTask.id} columnId={id} dataTask={dataTask} index={index} />
        ))
    : [];

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const draggableTask = localTasks.find((task) => task.id === draggableId);
    if (draggableTask && token) {
      const dataRequest = {
        token,
        title: draggableTask.title,
        order: destination.index + 1,
        description: draggableTask.description,
        userId: user.id,
        boardId: boardData.id,
        columnId: source.droppableId,
        taskId: draggableId,
      };
      setFetchDataUpdateTaskOrder(dataRequest);
    }
    const sourceOrder = source.index;
    const destinationOrder = destination.index;
    const sortLocalTasks = Array.from(localTasks).sort(sortTask);
    const listTasks = [...sortLocalTasks];
    listTasks.splice(sourceOrder, 1);
    listTasks.splice(destinationOrder, 0, sortLocalTasks[sourceOrder]);
    const updateOrder = listTasks.map((task, index) => ({ ...task, order: index + 1 }));
    setLocalTasks(updateOrder);
  };

  useEffect(() => {
    async function update() {
      if (fetchDataUpdateTaskOrder) {
        const responseUpdateListTak = await updateTaskList(fetchDataUpdateTaskOrder);
        if (responseUpdateListTak && token) {
          dispatch(fetchUpdateBoardDataById({ token, id: boardData.id }));
        }
      }
    }
    update();
  }, [localTasks, boardData.id, token, fetchDataUpdateTaskOrder, dispatch]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={id} type="task">
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
    </DragDropContext>
  );
};

export default Column;
