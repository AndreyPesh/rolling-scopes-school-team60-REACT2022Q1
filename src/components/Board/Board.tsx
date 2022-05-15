import './Board.scss';
import { Button, Paper } from '@mui/material';
import { BoardDescription } from '../../utils/types/types';
import { useAppDispatch } from '../../hooks';
import { open } from '../../store/slices/confirm';

const TITLE_REMOVE_BOARD = 'Remove board';
const QUESTION_REMOVE_BOARD = 'Are you sure want to delete the board ';

const Board: React.FC<BoardDescription> = ({ title }) => {
  const dispatch = useAppDispatch();
  const openConfirm = () => {
    dispatch(
      open({
        open: true,
        title: TITLE_REMOVE_BOARD,
        description: `${QUESTION_REMOVE_BOARD} ${title}?`,
        confirmAction: () => alert(),
      })
    );
  };

  return (
    <Paper elevation={3} className="board-card">
      <h2>Title : {title}</h2>
      <Button variant="outlined" color="error" onClick={openConfirm}>
        Remove
      </Button>
    </Paper>
  );
};

export default Board;
