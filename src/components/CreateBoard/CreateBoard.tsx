import { Button } from '@mui/material';
import FormCreateBoard from './FormCreateBoard';
import { useAppDispatch } from '../../hooks';
import { openModal } from '../../store/slices/modalSlice';
import { useTranslation } from 'react-i18next';

const CreateBoard = () => {
  const dispatch = useAppDispatch();
  const handleOpenModal = () => {
    dispatch(openModal({ open: true, contentModal: <FormCreateBoard /> }));
  };
  const { t } = useTranslation();

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpenModal}>
        {t('buttons.createBoard')}
      </Button>
    </>
  );
};

export default CreateBoard;
