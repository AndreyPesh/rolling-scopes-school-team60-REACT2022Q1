import './Main.scss';
import { useEffect } from 'react';
import Board from '../../components/Board/Board';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { fetchListBoards } from '../../store/slices/boards';

export default function Main() {
  const dispatch = useAppDispatch();
  const {
    user: { token },
    boards: { listBoards },
  } = useAppSelector((state: RootState) => state);
  const boards = listBoards.map((dataBoard) => <Board key={dataBoard.id} {...dataBoard} />);
  useEffect(() => {
    dispatch(fetchListBoards(token));
  }, [token, dispatch]);

  if (!listBoards.length) {
    return <div>List is empty</div>;
  }
  return <div className="list-board-card">{boards}</div>;
}
