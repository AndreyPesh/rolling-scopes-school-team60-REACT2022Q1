export type TypePropsModal = {
  open: boolean;
  content: JSX.Element;
};

export type ResponseSignIn = {
  token: string;
};
export type ResponseSignUp = {
  id: string;
  name: string;
  login: string;
};

export type DataFormSignIn = {
  login: string;
  password: string;
};
export type DataFormSignUp = {
  name: string;
  login: string;
  password: string;
};

export type DataUpdateUser = DataFormSignUp;

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

export type ErrorResponse = {
  response: {
    data: {
      statusCode: number;
      message: string;
    };
  };
};
