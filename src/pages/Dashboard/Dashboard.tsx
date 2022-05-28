import './dashboard.scss';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Path } from '../../router/routes';
import { RootState } from '../../store';
import {
  fetchBoardDataById,
  fetchUpdateBoardDataById,
  updateColumns,
  updateTasks,
} from '../../store/slices/currentBoardSlice';
import { openModal } from '../../store/slices/modalSlice';
import Column from './Column/Column';
import CreateColumnForm from './CreateForms/CreateColumnForm';
import CreateTaskForm from './CreateForms/CreateTaskForm';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { RequestUpdateTask, RequestUpdateColumn, RequestMoveTask } from '../../utils/types/types';
import {
  moveTaskBetweenColumn,
  updateColumnOrder,
  updateTaskList,
} from '../../utils/functions/api';
import { sortItemByOrder } from '../../utils/functions/sort';
import { NameDragAction } from '../../utils/enum/enum';
import {
  addTaskToDestination,
  OFFSET_FROM_INIT_INDEX_ARRAY,
  removeTaskFromSource,
  swapColumns,
  swapTask,
} from '../../utils/functions/dnd';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const {
    user,
    auth: { token },
    currentBoard: { boardData, loading, errors },
  } = useAppSelector((state: RootState) => state);
  const [fetchDataUpdateColumnOrder, setFetchDataUpdateColumnOrder] =
    useState<RequestUpdateColumn>();
  const [fetchDataUpdateTaskOrder, setFetchDataUpdateTaskOrder] = useState<RequestUpdateTask>();
  const [fetchMoveTaskBetweenColumn, setFetchMoveTaskBetweenColumn] = useState<RequestMoveTask>();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate(`${Path.home}`);
    } else if (token) {
      dispatch(fetchBoardDataById({ token, id }));
    }
  }, [id, navigate, dispatch, token]);

  useEffect(() => {
    const fetchUpdateColumnOrder = async () => {
      if (fetchDataUpdateColumnOrder) {
        const responseUpdateColumn = await updateColumnOrder(fetchDataUpdateColumnOrder);
        if (responseUpdateColumn && token) {
          dispatch(fetchUpdateBoardDataById({ token, id: boardData.id }));
        }
      }
    };
    fetchUpdateColumnOrder();
  }, [fetchDataUpdateColumnOrder, token, boardData.id, dispatch]);

  useEffect(() => {
    async function fetchUpdateColumnOrder() {
      if (fetchDataUpdateTaskOrder) {
        const responseUpdateListTak = await updateTaskList(fetchDataUpdateTaskOrder);
        if (responseUpdateListTak && token) {
          dispatch(fetchUpdateBoardDataById({ token, id: boardData.id }));
        }
      }
    }
    fetchUpdateColumnOrder();
  }, [fetchDataUpdateTaskOrder, token, boardData.id, dispatch]);

  useEffect(() => {
    async function moveFetchTaskBetweenColumn() {
      if (fetchMoveTaskBetweenColumn) {
        const responseMoveTaskBetweenColumn = await moveTaskBetweenColumn(
          fetchMoveTaskBetweenColumn
        );
        if (responseMoveTaskBetweenColumn && token) {
          dispatch(fetchUpdateBoardDataById({ token, id: boardData.id }));
        }
      }
    }
    moveFetchTaskBetweenColumn();
  }, [fetchMoveTaskBetweenColumn, token, boardData.id, dispatch]);

  const addColumn = () => {
    dispatch(openModal({ open: true, contentModal: <CreateColumnForm /> }));
  };
  const addTask = () => {
    dispatch(openModal({ open: true, contentModal: <CreateTaskForm /> }));
  };

  const listColumns = Array.from(boardData.columns)
    .sort(sortItemByOrder)
    .map((column, index) => {
      return (
        <Draggable key={column.id} draggableId={column.id} index={index}>
          {(provided) => (
            <div
              className="wrap-column"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <Column {...column} />
            </div>
          )}
        </Draggable>
      );
    });

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    const { columns } = boardData;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (result.type === NameDragAction.COLUMN) {
      const currentDragColumn = columns.find((column) => column.id === draggableId);
      if (currentDragColumn && token) {
        const dataRequest: RequestUpdateColumn = {
          token,
          title: currentDragColumn.title,
          order: destination.index + OFFSET_FROM_INIT_INDEX_ARRAY,
          boardId: boardData.id,
          columnId: draggableId,
        };
        setFetchDataUpdateColumnOrder(dataRequest);
        const swappedColumns = swapColumns(columns, source.index, destination.index);
        dispatch(updateColumns(swappedColumns));
      }
    }
    if (result.type === NameDragAction.TASK) {
      const destinationColumnId = destination.droppableId;
      const sourceColumnId = source.droppableId;
      const droppableColumn = columns.find((column) => column.id === source.droppableId);
      if (droppableColumn && destinationColumnId === sourceColumnId) {
        const listCurrentTasks = droppableColumn.tasks;
        const draggableTask = listCurrentTasks.find((task) => task.id === draggableId);
        if (draggableTask && token) {
          const dataRequestUpdateTask: RequestUpdateTask = {
            token,
            title: draggableTask.title,
            order: destination.index + OFFSET_FROM_INIT_INDEX_ARRAY,
            description: draggableTask.description,
            userId: user.id,
            boardId: boardData.id,
            columnId: source.droppableId,
            taskId: draggableId,
          };
          setFetchDataUpdateTaskOrder(dataRequestUpdateTask);
          const swappedTasks = swapTask(listCurrentTasks, source.index, destination.index);
          dispatch(updateTasks({ idColumn: source.droppableId, tasks: swappedTasks }));
        }
      } else if (droppableColumn && token) {
        const destinationColumn = columns.find((column) => column.id === destinationColumnId);
        const sourceSortTasks = Array.from(droppableColumn.tasks).sort(sortItemByOrder);
        const sourceDataTask = sourceSortTasks[source.index];
        if (destinationColumn) {
          const addedDestinationTasks = addTaskToDestination(
            destinationColumn.tasks,
            sourceDataTask,
            destination.index
          );
          dispatch(updateTasks({ idColumn: destinationColumnId, tasks: addedDestinationTasks }));
        }
        const removedTasks = removeTaskFromSource(sourceSortTasks, source.index);
        dispatch(updateTasks({ idColumn: sourceColumnId, tasks: removedTasks }));
        const dataMoveTaskBetweenColumn: RequestMoveTask = {
          token,
          title: sourceDataTask.title,
          order: destination.index + 1,
          description: sourceDataTask.description,
          userId: user.id,
          boardId: boardData.id,
          columnId: sourceColumnId,
          taskId: sourceDataTask.id,
          destinationColumnId: destinationColumnId,
        };
        setFetchMoveTaskBetweenColumn(dataMoveTaskBetweenColumn);
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }
  if (errors) {
    return <h2>{errors}</h2>;
  }

  return (
    <>
      <h2>
        {t('dashboardPage.h2_1')}: {boardData.title}
      </h2>
      <div className="dashboard-buttons">
        <Button variant="contained" color="secondary" onClick={addColumn}>
          {t('buttons.addCol')}
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={addTask}
          disabled={!boardData.columns.length}
        >
          {t('buttons.addTask')}
        </Button>
      </div>
      <h2>{t('dashboardPage.h2_2')}</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type={NameDragAction.COLUMN}>
          {(provided) => (
            <div className="columns" ref={provided.innerRef} {...provided.droppableProps}>
              {!listColumns.length ? 'Column list is empty' : listColumns}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
