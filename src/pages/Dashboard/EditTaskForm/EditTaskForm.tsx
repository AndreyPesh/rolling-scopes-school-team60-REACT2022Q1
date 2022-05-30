import { ChangeEvent, FormEvent, useState } from 'react';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './edit-task-form.scss';
import { RequestUpdateTask, TaskData, TaskDataForm } from '../../../utils/types/types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import { updateTaskList } from '../../../utils/functions/api';
import { fetchBoardDataById } from '../../../store/slices/currentBoardSlice';
import { closeModal } from '../../../store/slices/modalSlice';

const EditTaskForm: React.FC<{ columnId: string; dataTask: TaskData }> = ({
  columnId,
  dataTask,
}) => {
  const { title, description, id, order, userId } = dataTask;
  const {
    auth: { token },
    currentBoard: { boardData },
  } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
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

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    if (token) {
      const dataUpdateTask: RequestUpdateTask = {
        token,
        title: dataForm.title,
        order,
        description: dataForm.description,
        userId,
        boardId: boardData.id,
        columnId,
        taskId: id,
      };
      const responseUpdateTask = await updateTaskList(dataUpdateTask);
      if (responseUpdateTask) {
        dispatch(closeModal(false));
        await dispatch(fetchBoardDataById({ token, id: boardData.id }));
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleForm} className="edit-task">
      <FormControl
        sx={{
          '& > :not(style)': { m: 1 },
        }}
      >
        <div className="row-edit">
          <h3>{t('form.title')}: </h3>
          <TextField
            variant="outlined"
            size="small"
            name="title"
            value={dataForm.title}
            onChange={handleDataTask}
          />
        </div>
        <div className="row-edit">
          <h3>{t('form.description')}: </h3>
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
          color="primary"
          disabled={dataForm.description.length < 4 || dataForm.title.length < 4}
        >
          {t('buttons.update')}
        </Button>
      </FormControl>
    </Box>
  );
};

export default EditTaskForm;
