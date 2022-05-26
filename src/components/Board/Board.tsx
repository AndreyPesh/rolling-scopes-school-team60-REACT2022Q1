import './Board.scss';
import { MouseEvent } from 'react';
import { Button, Paper } from '@mui/material';
import { DataBoard } from '../../utils/types/types';
import { useAppDispatch } from '../../hooks';
import icon from '../../assets/image/case.svg';
import { open } from '../../store/slices/confirmSlice';
import { removeBoardById } from '../../utils/functions/api';
import { fetchListBoards } from '../../store/slices/boardsSlice';
import { getToken } from '../../utils/functions/localStorage';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../router/routes';
import { TAG_NAME_BUTTON } from '../../utils/constants';
import { useTranslation } from 'react-i18next';

const TITLE_REMOVE_BOARD = 'Remove board';
const QUESTION_REMOVE_BOARD = 'Are you sure want to delete the board ';

const Board: React.FC<DataBoard> = ({ id, title, description }) => {
  const navigate = useNavigate();
  const token = getToken();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
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
  const openBoard = (event: MouseEvent<HTMLElement>) => {
    const nameTarget = (event.target as HTMLElement).tagName;
    if (nameTarget && nameTarget !== TAG_NAME_BUTTON) {
      navigate(`/${Path.dashboard}/${id}`);
    }
  };

  return (
    <Paper elevation={3} className="board-card" onClick={openBoard}>
      <h2>{title}</h2>
      <h3>{description}</h3>
      <img src={icon} alt={title} className="board-card__icon" />
      <Button variant="outlined" color="error" onClick={openConfirm}>
        {t('buttons.remove')}
      </Button>
    </Paper>
  );
};

export default Board;
