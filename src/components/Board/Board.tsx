import './Board.scss';
import { Button, Paper } from '@mui/material';
import { BoardDescription } from '../../utils/types/types';
import { useAppDispatch } from '../../hooks';
import icon from '../../assets/image/case.svg';
import { open } from '../../store/slices/confirmSlice';
import { removeBoardById } from '../../utils/functions/api';
import { fetchListBoards } from '../../store/slices/boardsSlice';
import { getToken } from '../../utils/functions/localStorage';

const TITLE_REMOVE_BOARD = 'Remove board';
const QUESTION_REMOVE_BOARD = 'Are you sure want to delete the board ';

const Board: React.FC<BoardDescription> = ({ id, title }) => {
  const token = getToken();
  const dispatch = useAppDispatch();
  const openConfirm = () => {
    dispatch(
      open({
        open: true,
        title: TITLE_REMOVE_BOARD,
        description: `${QUESTION_REMOVE_BOARD} ${title}?`,
        confirmAction: async () => {
          await removeBoardById(token, id), dispatch(fetchListBoards(token));
        },
      })
    );
  };

  return (
    <Paper elevation={3} className="board-card">
      <h2>{title}</h2>
      <img src={icon} alt={title} className="board-card__icon" />
      <Button variant="outlined" color="error" onClick={openConfirm}>
        Remove
      </Button>
    </Paper>
  );
};

export default Board;
