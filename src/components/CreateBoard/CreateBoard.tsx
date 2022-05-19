import { Button } from '@mui/material';
import FormCreateBoard from './FormCreateBoard';
import { useAppDispatch } from '../../hooks';
import { openModal } from '../../store/slices/modalSlice';

const CreateBoard = () => {
  const dispatch = useAppDispatch();
  const handleOpenModal = () => {
    dispatch(openModal({ open: true, contentModal: <FormCreateBoard /> }));
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpenModal}>
        Create new board
      </Button>
    </>
  );
};

export default CreateBoard;
