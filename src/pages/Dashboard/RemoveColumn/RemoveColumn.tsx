import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import { removeColumnById } from '../../../utils/functions/api';
import { fetchBoardDataById } from '../../../store/slices/currentBoardSlice';
import { open } from '../../../store/slices/confirmSlice';

const TITLE_REMOVE_COLUMN = 'Remove column';
const QUESTION_REMOVE_COLUMN = 'Are you sure you want to delete the column ';

const RemoveColumn: React.FC<{ boardId: string; columnId: string; title: string }> = ({
  boardId,
  columnId,
  title,
}) => {
  const {
    auth: { token },
    currentBoard: { boardData },
  } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const openConfirm = () => {
    dispatch(
      open({
        open: true,
        title: TITLE_REMOVE_COLUMN,
        description: `${QUESTION_REMOVE_COLUMN} ${title}?`,
        confirmAction: async () => {
          if (token) {
            await removeColumnById(token, boardId, columnId);
            dispatch(fetchBoardDataById({ token, id: boardData.id }));
          }
        },
      })
    );
  };

  return (
    <Button variant="outlined" color="error" onClick={openConfirm}>
      Remove
    </Button>
  );
};

export default RemoveColumn;
