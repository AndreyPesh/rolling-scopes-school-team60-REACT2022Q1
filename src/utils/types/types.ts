export type TypePropsModal = {
  open: boolean;
  handleClose: (state: boolean) => void;
  content: JSX.Element;
};

export type ResponseSignin = {
  token: string;
};

export type DataFormSignin = {
  login: string;
  password: string;
};

export type UserData = {
  id: string;
  name: string;
  login: string;
};

export type DataBoard = {
  id: string;
  title: string;
};

export type BoardDescription = {
  id: string;
  title: string;
  columns: Array<ColumnBoard>;
};

export type ColumnBoard = {
  id: string;
  title: string;
  order: number;
  tasks: Array<TaskData>;
};

export type TaskData = {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: Array<FileData>;
};

export type FileData = {
  filename: string;
  fileSize: number;
};
