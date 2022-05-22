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

export type UserData = {
  id: string;
  name: string;
  login: string;
};

export type CreateDataBoard = {
  title: string;
  description: string;
};

export type DataBoard = {
  id: string;
  title: string;
  description: string;
};

export type BoardDescription = {
  id: string;
  title: string;
  columns: Array<ColumnData>;
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

export type RequestColumnData = {
  token: string;
  boardId: string;
  dataColumn: CreateColumnData;
};

export interface CreateColumnData {
  title: string;
}

export interface ColumnData extends CreateColumnData {
  id: string;
  order: number;
  tasks: Array<TaskData>;
}

export interface CreateDataTask {
  title: string;
  description: string;
  userId: string;
}

export interface RequestCreateTask extends CreateDataTask {
  boardId: string;
  columnId: string;
}
