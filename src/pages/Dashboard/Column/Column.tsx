import './column.scss';
import { Paper } from '@mui/material';
import { ColumnData } from '../../../utils/types/types';
import { useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import RemoveColumn from '../RemoveColumn/RemoveColumn';

const Column = ({ title, id }: ColumnData) => {
  const {
    currentBoard: { boardData },
  } = useAppSelector((state: RootState) => state);

  return (
    <Paper className="column">
      <h2>{title}</h2>
      <div className="column__buttons">
        <RemoveColumn boardId={boardData.id} columnId={id} title={title} />
      </div>
    </Paper>
  );
};

export default Column;
