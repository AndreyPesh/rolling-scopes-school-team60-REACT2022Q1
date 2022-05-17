import './Main.scss';
import { useEffect } from 'react';
import Board from '../../components/Board/Board';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { fetchListBoards } from '../../store/slices/boardsSlice';
import Spinner from '../../components/Spinner/Spinner';

export default function Main() {
  const dispatch = useAppDispatch();
  const {
    auth: { token },
    boards: { loading, listBoards },
  } = useAppSelector((state: RootState) => state);
  const boards = listBoards.map((dataBoard) => <Board key={dataBoard.id} {...dataBoard} />);

  useEffect(() => {
    if (token) {
      dispatch(fetchListBoards(token));
    }
  }, [token, dispatch]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <h2>List boards</h2>
      <div className="list-board-card">
        {!listBoards.length ? <h2>List boards is empty</h2> : boards}
      </div>
    </>
  );
}
