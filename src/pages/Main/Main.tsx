import './Main.scss';
import { useEffect } from 'react';
import Board from '../../components/Board/Board';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { fetchListBoards } from '../../store/slices/boardsSlice';
import { getUser } from '../../utils/functions/api';
import { getUserPending, getUserSuccess } from '../../store/slices/userSlice';

export default function Main() {
  const dispatch = useAppDispatch();
  const {
    auth: { token },
    boards: { listBoards },
  } = useAppSelector((state: RootState) => state);
  const boards = listBoards.map((dataBoard) => <Board key={dataBoard.id} {...dataBoard} />);
  const { error, isLoading, name, login } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(fetchListBoards(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(getUserPending());

      const response = await getUser();

      dispatch(getUserSuccess(response));
    };
    fetchUser();
  }, [dispatch]);

  if (!listBoards.length) {
    return <div>List is empty</div>;
  }
  return (
    <>
      <h2>Main</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <p>login: {login}</p>
      <p>name: {name}</p>
      <div className="list-board-card">{boards}</div>
    </>
  );
}
