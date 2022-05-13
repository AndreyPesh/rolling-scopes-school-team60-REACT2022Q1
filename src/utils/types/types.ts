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
