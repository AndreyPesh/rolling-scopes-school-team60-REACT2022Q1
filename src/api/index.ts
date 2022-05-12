import axios from 'axios';

const API_URL = 'https://mighty-earth-43476.herokuapp.com';

type LoginType = {
  login: string;
  password: string;
};

export type SignInResponse = {
  token: string;
};

export const signIn = async (formData: LoginType) => {
  const { data } = await axios.post<SignInResponse>(`${API_URL}/signin`, formData);
  return data;
};
