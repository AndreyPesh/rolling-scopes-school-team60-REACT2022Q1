import './dashboard.scss';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Path } from '../../router/routes';
import { RootState } from '../../store';
import { fetchBoardDataById } from '../../store/slices/currentBoardSlice';
import { openModal } from '../../store/slices/modalSlice';
import Column from './Column/Column';
import CreateColumnForm from './CreateForms/CreateColumnForm';
import CreateTaskForm from './CreateForms/CreateTaskForm';

export default function Dashboard() {
  const {
    auth: { token },
    currentBoard: { boardData, loading, errors },
  } = useAppSelector((state: RootState) => state);
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

  const addColumn = () => {
    dispatch(openModal({ open: true, contentModal: <CreateColumnForm /> }));
  };
  const addTask = () => {
    dispatch(openModal({ open: true, contentModal: <CreateTaskForm /> }));
  };

  const listColumns = boardData.columns.map((column) => <Column key={column.id} {...column} />);

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
      <div className="columns">{listColumns}</div>
    </>
  );
}
