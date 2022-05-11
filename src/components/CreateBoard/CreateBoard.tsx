import { useState } from 'react';

import { Button } from '@mui/material';

import Modal from '../Modal/Modal';

const CreateBoard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Create new board
      </Button>
      <Modal open={open} handleClose={handleClose} content={<h1>Component create board</h1>} />
    </>
  );
};

export default CreateBoard;
