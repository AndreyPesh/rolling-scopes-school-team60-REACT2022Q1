import { useState } from 'react';
import Modal from '../Modal/Modal';

const CreateBoard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <button type="button" onClick={handleOpen}>
        create new board
      </button>
      <Modal open={open} handleClose={handleClose} content={<h1>Component create board</h1>} />
    </>
  );
};

export default CreateBoard;
