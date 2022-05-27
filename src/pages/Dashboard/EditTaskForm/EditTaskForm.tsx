import { ChangeEvent, useState } from 'react';
import { Box, Button, FormControl, TextField } from '@mui/material';
import './edit-task-form.scss';
import { TaskData, TaskDataForm } from '../../../utils/types/types';

const EditTaskForm = (dataTask: TaskData) => {
  const { title, description } = dataTask;
  const [dataForm, setDataForm] = useState<TaskDataForm>({
    title,
    description,
  });

  const handleDataTask = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      target: { value, name },
    } = event;

    setDataForm({ ...dataForm, [name]: value });
  };

  const handleForm = () => {};

  return (
    <Box component="form" onSubmit={handleForm} className="edit-task">
      <FormControl
        sx={{
          '& > :not(style)': { m: 1 },
        }}
      >
        <div className="row-edit">
          <h3>Title: </h3>
          <TextField
            variant="outlined"
            size="small"
            name="title"
            value={dataForm.title}
            onChange={handleDataTask}
          />
        </div>
        <div className="row-edit">
          <h3>Description: </h3>
          <TextField
            id="outlined-multiline-static"
            multiline
            name="description"
            rows={3}
            value={dataForm.description}
            onChange={handleDataTask}
          />
        </div>

        <Button
          variant="contained"
          type="submit"
          color="success"
          disabled={dataForm.description.length < 4 || dataForm.title.length < 4}
        >
          Update
        </Button>
      </FormControl>
    </Box>
  );
};

export default EditTaskForm;
