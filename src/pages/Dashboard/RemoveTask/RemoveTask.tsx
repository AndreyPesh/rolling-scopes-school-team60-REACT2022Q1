import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import { removeTaskById } from '../../../utils/functions/api';
import { fetchBoardDataById } from '../../../store/slices/currentBoardSlice';
import { open } from '../../../store/slices/confirmSlice';
import { TaskData } from '../../../utils/types/types';

const TITLE_REMOVE_COLUMN = 'Remove task';
const QUESTION_REMOVE_COLUMN = 'Are you sure you want to delete the task ';

const RemoveTask: React.FC<{ columnId: string; dataTask: TaskData }> = ({ columnId, dataTask }) => {
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
        description: `${QUESTION_REMOVE_COLUMN} ${dataTask.title}?`,
        confirmAction: async () => {
          if (token) {
            await removeTaskById(token, { boardId: boardData.id, columnId, taskId: dataTask.id });
            dispatch(fetchBoardDataById({ token, id: boardData.id }));
          }
        },
      })
    );
  };

  return <DeleteOutlineIcon color="error" className="delete-button" onClick={openConfirm} />;
};

export default RemoveTask;
