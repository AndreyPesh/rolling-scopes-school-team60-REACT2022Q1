import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import { fetchBoardDataById } from '../../../store/slices/currentBoardSlice';
import { closeModal } from '../../../store/slices/modalSlice';
import { EMPTY_STRING } from '../../../utils/constants';
import { createTask } from '../../../utils/functions/api';
import { RequestCreateTask } from '../../../utils/types/types';

const CreateTaskForm = () => {
  const {
    auth: { token },
    user,
    currentBoard: {
      boardData: { id, columns },
    },
  } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const [dataTask, setDataTask] = useState({
    columnId: EMPTY_STRING,
    title: EMPTY_STRING,
    description: EMPTY_STRING,
  });
  const [selectColumn, setSelectColumn] = useState(EMPTY_STRING);

  const listSelectItem = columns.map((column) => (
    <MenuItem key={column.id} value={column.id}>
      {column.title}
    </MenuItem>
  ));

  const handleDataTask = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = event;
    setDataTask({ ...dataTask, [name]: value });
  };
  const handleSelectColumn = (event: SelectChangeEvent) => {
    setDataTask({ ...dataTask, [event.target.name]: event.target.value });
    setSelectColumn(event.target.value as string);
  };

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    const requestDataCreateTask: RequestCreateTask = {
      ...dataTask,
      boardId: id,
      userId: user.id,
    };
    if (token) {
      dispatch(closeModal(false));
      const responseCreateTask = await createTask(token, requestDataCreateTask);
      if (responseCreateTask) {
        dispatch(fetchBoardDataById({ token, id }));
      }
    }
  };

  return (
    <>
      <h2>Create task</h2>
      <Box component="form" onSubmit={handleForm}>
        <FormControl
          sx={{
            '& > :not(style)': { m: 1 },
          }}
        >
          <InputLabel id="simple-select-label">Column</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={selectColumn}
            label="Column"
            size="small"
            name="columnId"
            onChange={handleSelectColumn}
          >
            {listSelectItem}
          </Select>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            size="small"
            name="title"
            onChange={handleDataTask}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            size="small"
            name="description"
            onChange={handleDataTask}
          />
          <Button
            variant="contained"
            type="submit"
            color="success"
            disabled={dataTask.description.length < 4 || dataTask.title.length < 4}
          >
            Create
          </Button>
        </FormControl>
      </Box>
    </>
  );
};
export default CreateTaskForm;
