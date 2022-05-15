import { useState } from 'react';

import { Button } from '@mui/material';

import Modal from '../Modal/Modal';
import FormCreateBoard from './FormCreateBoard';

const CreateBoard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Create new board
      </Button>
      <Modal
        open={open}
        handleClose={handleClose}
        content={<FormCreateBoard handleClose={handleClose} />}
      />
    </>
  );
};

export default CreateBoard;
