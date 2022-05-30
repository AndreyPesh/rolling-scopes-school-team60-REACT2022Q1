import './Main.scss';
import { useEffect } from 'react';
import Board from '../../components/Board/Board';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { fetchListBoards } from '../../store/slices/boardsSlice';
import Spinner from '../../components/Spinner/Spinner';
import { useTranslation } from 'react-i18next';

export default function Main() {
  const dispatch = useAppDispatch();
  const {
    auth: { token },
    boards: { loading, listBoards, errors },
  } = useAppSelector((state: RootState) => state);
  const boards = listBoards.map((dataBoard) => <Board key={dataBoard.id} {...dataBoard} />);

  const { t } = useTranslation();

  useEffect(() => {
    if (token) {
      dispatch(fetchListBoards(token));
    }
  }, [token, dispatch]);

  if (loading) {
    return <Spinner />;
  }
  if (errors) {
    return <h2>{errors}</h2>;
  }
  return (
    <section className="boards-main">
      <h2>{t(`mainPage.title`)}</h2>
      <div className="list-board-card">
        {!listBoards.length ? <h2>{t(`mainPage.isEmpty`)}</h2> : boards}
      </div>
    </section>
  );
}
