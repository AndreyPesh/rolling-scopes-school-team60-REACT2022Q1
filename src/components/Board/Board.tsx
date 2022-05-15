import './Board.scss';
import { Button, Paper } from '@mui/material';
import { BoardDescription } from '../../utils/types/types';

const Board: React.FC<BoardDescription> = ({ title }) => {
  return (
    <Paper elevation={3} className="board-card">
      <h2>Title : {title}</h2>
      <Button variant="outlined" color="error">
        Remove
      </Button>
    </Paper>
  );
};

export default Board;
