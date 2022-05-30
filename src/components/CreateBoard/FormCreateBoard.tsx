import { Box, Button, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Path } from '../../router/routes';
import { RootState } from '../../store';
import { fetchListBoards } from '../../store/slices/boardsSlice';
import { closeModal } from '../../store/slices/modalSlice';
import { EMPTY_STRING } from '../../utils/constants';
import { createBoard } from '../../utils/functions/api';
import { CreateDataBoard } from '../../utils/types/types';

const FormCreateBoard = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [dataBoard, setDataBoard] = useState<CreateDataBoard>({
    title: EMPTY_STRING,
    description: EMPTY_STRING,
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDataBoard = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setDataBoard({ ...dataBoard, [name]: value });
  };

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    if (token) {
      await createBoard(token, dataBoard);
      dispatch(closeModal(false));
      navigate(`/${Path.main}`);
      dispatch(fetchListBoards(token));
    }
  };

  return (
    <>
      <h2>{t('form.addBoard')}</h2>
      <Box component="form" onSubmit={handleForm}>
        <FormControl
          sx={{
            '& > :not(style)': { m: 1 },
          }}
        >
          <TextField
            id="outlined-basic"
            label={t('form.title')}
            variant="outlined"
            size="small"
            name="title"
            onChange={handleDataBoard}
          />
          <TextField
            id="outlined-basic"
            label={t('form.description')}
            variant="outlined"
            size="small"
            name="description"
            onChange={handleDataBoard}
          />
          <Button
            variant="contained"
            type="submit"
            color="success"
            disabled={dataBoard.title.length < 4 || dataBoard.description.length < 4}
          >
            {t('buttons.create')}
          </Button>
        </FormControl>
      </Box>
    </>
  );
};

export default FormCreateBoard;
