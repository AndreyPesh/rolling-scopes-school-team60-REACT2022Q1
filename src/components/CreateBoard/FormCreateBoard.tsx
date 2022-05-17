import { Box, Button, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Path } from '../../router/routes';
import { RootState } from '../../store';
import { fetchListBoards } from '../../store/slices/boardsSlice';
import { createBoard } from '../../utils/functions/api';

const FormCreateBoard: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [nameBoard, setNameBoard] = useState<string>('');
  const navigate = useNavigate();

  const handleNameBoard = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setNameBoard(value);
  };

  const handleForm = async (event: SyntheticEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (token) {
      await createBoard(token, nameBoard);
      handleClose();
      navigate(`/${Path.main}`);
      dispatch(fetchListBoards(token));
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
          label="Name board"
          variant="outlined"
          size="small"
          name="name_board"
          onChange={handleNameBoard}
        />
        <Button variant="contained" type="submit" color="success" disabled={nameBoard.length < 4}>
          Create
        </Button>
      </FormControl>
    </Box>
  );
};

export default FormCreateBoard;
