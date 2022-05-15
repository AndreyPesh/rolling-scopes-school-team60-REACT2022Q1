export type TypePropsModal = {
  open: boolean;
  handleClose: (state: boolean) => void;
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

export type ErrorResponse = {
  response: {
    data: {
      statusCode: number;
      message: string;
    };
  };
};
