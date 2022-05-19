import { Box, Button, FormControl, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import { fetchAddColumn } from '../../../store/slices/currentBoardSlice';
import { closeModal } from '../../../store/slices/modalSlice';
import { EMPTY_STRING } from '../../../utils/constants';

const CreateColumnForm = () => {
  const {
    auth: { token },
    currentBoard: {
      boardData: { id, columns },
    },
  } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const [nameColumn, setNameColumn] = useState<string>(EMPTY_STRING);

  const handleNameColumn = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setNameColumn(value);
  };

  const handleForm = (event: FormEvent) => {
    event.preventDefault();
    const dataColumn = { title: nameColumn, order: columns.length + 1 };
    if (token) {
      dispatch(closeModal(false));
      dispatch(fetchAddColumn({ token, boardId: id, dataColumn }));
    }
  };

  return (
    <Box component="form" onSubmit={handleForm}>
      <FormControl
        sx={{
          '& > :not(style)': { m: 1 },
        }}
      >
        <TextField
          id="outlined-basic"
          label="Column"
          variant="outlined"
          size="small"
          name="name_column"
          onChange={handleNameColumn}
        />
        <Button variant="contained" type="submit" color="success" disabled={nameColumn.length < 4}>
          Create
        </Button>
      </FormControl>
    </Box>
  );
};

export default CreateColumnForm;
