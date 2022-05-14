import { useState } from 'react';
import Modal from '../Modal/Modal';
import FormCreateBoard from './FormCreateBoard';

const CreateBoard = () => {
  const [open, setOpen] = useState<boolean>(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <button type="button" onClick={handleOpen}>
        create new board
      </button>
      <Modal
        open={open}
        handleClose={handleClose}
        content={<FormCreateBoard handleClose={handleClose} />}
      />
    </>
  );
};

export default CreateBoard;
