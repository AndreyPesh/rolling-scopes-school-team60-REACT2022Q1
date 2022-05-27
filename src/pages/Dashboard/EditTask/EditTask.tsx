import EditIcon from '@mui/icons-material/Edit';
import './edit-task.scss';
import { useAppDispatch } from '../../../hooks';
import { openModal } from '../../../store/slices/modalSlice';
import { TaskData } from '../../../utils/types/types';
import EditTaskForm from '../EditTaskForm/EditTaskForm';

const EditTask = (dataTask: TaskData) => {
  const dispatch = useAppDispatch();
  const openEditTaskModal = () => {
    dispatch(openModal({ open: true, contentModal: <EditTaskForm {...dataTask} /> }));
  };
  return <EditIcon color="success" onClick={openEditTaskModal} className="edit-button" />;
};

export default EditTask;
