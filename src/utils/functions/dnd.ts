import { ColumnData, TaskData } from '../types/types';
import { sortItemByOrder } from './sort';

export const OFFSET_FROM_INIT_INDEX_ARRAY = 1;

export const swapColumns = (
  columns: Array<ColumnData>,
  sourceIndex: number,
  destinationIndex: number
): Array<ColumnData> => {
  const sortListColumns = Array.from(columns).sort(sortItemByOrder);
  const columnsList = [...sortListColumns];
  columnsList.splice(sourceIndex, 1);
  columnsList.splice(destinationIndex, 0, sortListColumns[sourceIndex]);
  const swappedColumns = columnsList.map((column, index) => ({
    ...column,
    order: index + OFFSET_FROM_INIT_INDEX_ARRAY,
  }));
  return swappedColumns;
};

export const swapTask = (
  tasks: Array<TaskData>,
  sourceIndex: number,
  destinationIndex: number
): Array<TaskData> => {
  const sortLocalTasks = Array.from(tasks).sort(sortItemByOrder);
  const listTasks = [...sortLocalTasks];
  listTasks.splice(sourceIndex, 1);
  listTasks.splice(destinationIndex, 0, sortLocalTasks[sourceIndex]);
  const swappedTasks = listTasks.map((task, index) => ({
    ...task,
    order: index + OFFSET_FROM_INIT_INDEX_ARRAY,
  }));
  return swappedTasks;
};

export const addTaskToDestination = (
  destinationTasks: Array<TaskData>,
  sourceTask: TaskData,
  destinationIndex: number
): Array<TaskData> => {
  const destinationSortTasks = Array.from(destinationTasks).sort(sortItemByOrder);
  destinationSortTasks.splice(destinationIndex, 0, sourceTask);
  const addDestinationTasks = destinationSortTasks.map((task, index) => ({
    ...task,
    order: index + OFFSET_FROM_INIT_INDEX_ARRAY,
  }));
  return addDestinationTasks;
};

export const removeTaskFromSource = (
  sourceSortTasks: Array<TaskData>,
  sourceIndex: number
): Array<TaskData> => {
  sourceSortTasks.splice(sourceIndex, 1);
  const removeSourceTasks = sourceSortTasks.map((task, index) => ({
    ...task,
    order: index + OFFSET_FROM_INIT_INDEX_ARRAY,
  }));
  return removeSourceTasks;
};
