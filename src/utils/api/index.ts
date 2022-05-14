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

export const getUser = async (params: string) => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get(`${API_URL}/users/${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
