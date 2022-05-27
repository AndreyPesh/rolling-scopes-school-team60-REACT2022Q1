import { ColumnData, TaskData } from '../types/types';

export const sortItemByOrder = <T extends TaskData | ColumnData>(itemPrev: T, itemNext: T) => {
  if (itemPrev.order > itemNext.order) {
    return 1;
  }
  if (itemPrev.order < itemNext.order) {
    return -1;
  }
  return 0;
};
