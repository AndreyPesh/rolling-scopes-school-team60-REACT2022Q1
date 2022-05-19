import { Paper } from '@mui/material';
import './task.scss';
import { TaskData } from '../../../utils/types/types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Task: React.FC<TaskData> = ({ title }) => {
  return (
    <Paper className="task">
      <h2>{title}</h2>
      <DeleteOutlineIcon color="error" className="delete-button" />
    </Paper>
  );
};

export default Task;
