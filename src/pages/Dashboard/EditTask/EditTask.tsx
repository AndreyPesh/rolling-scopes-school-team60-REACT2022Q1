import { TaskData } from '../../../utils/types/types';

const EditTask = (taskData: TaskData) => {
  return <h2>{taskData.title}</h2>;
};

export default EditTask;
