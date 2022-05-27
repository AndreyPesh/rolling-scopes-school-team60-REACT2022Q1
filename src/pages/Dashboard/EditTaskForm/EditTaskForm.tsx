import { TaskData } from '../../../utils/types/types';

const EditTaskForm = (dataTask: TaskData) => {
  return <h2>{dataTask.title}</h2>;
};

export default EditTaskForm;
