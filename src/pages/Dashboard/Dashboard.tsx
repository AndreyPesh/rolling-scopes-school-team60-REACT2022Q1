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
} from '../../store/slices/currentBoardSlice';
import { openModal } from '../../store/slices/modalSlice';
import Column from './Column/Column';
import CreateColumnForm from './CreateForms/CreateColumnForm';
import CreateTaskForm from './CreateForms/CreateTaskForm';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { RequestUpdateColumn } from '../../utils/types/types';
import { updateColumnOrder } from '../../utils/functions/api';
import { sortItemByOrder } from '../../utils/functions/sort';

export default function Dashboard() {
  const {
    auth: { token },
    currentBoard: { boardData, loading, errors },
  } = useAppSelector((state: RootState) => state);
  const [fetchDataUpdateColumnOrder, setFetchDataUpdateColumnOrder] =
    useState<RequestUpdateColumn>();
  const dispatch = useAppDispatch();
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
    const currentDragColumn = columns.find((column) => column.id === draggableId);
    if (currentDragColumn && token) {
      const dataRequest: RequestUpdateColumn = {
        token,
        title: currentDragColumn.title,
        order: destination.index + 1,
        boardId: boardData.id,
        columnId: draggableId,
      };
      setFetchDataUpdateColumnOrder(dataRequest);
    }
    const sortListColumns = Array.from(columns).sort(sortItemByOrder);
    const columnsList = [...sortListColumns];
    columnsList.splice(source.index, 1);
    columnsList.splice(destination.index, 0, sortListColumns[source.index]);
    const updatedColumns = columnsList.map((column, index) => ({ ...column, order: index + 1 }));
    dispatch(updateColumns(updatedColumns));
  };

  if (loading) {
    return <Spinner />;
  }
  if (errors) {
    return <h2>{errors}</h2>;
  }

  return (
    <>
      <h2>Board: {boardData.title}</h2>
      <div className="dashboard-buttons">
        <Button variant="contained" color="secondary" onClick={addColumn}>
          Add column
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={addTask}
          disabled={!boardData.columns.length}
        >
          Add task
        </Button>
      </div>
      <h2>List columns</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
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
