import { TaskData } from '../types/types';

export const sortTask = (taskPrev: TaskData, taskNext: TaskData) => {
  if (taskPrev.order > taskNext.order) {
    return 1;
  }
  if (taskPrev.order < taskNext.order) {
    return -1;
  }
  return 0;
};
