import axios from 'axios';
import { ALL_USERS_URL, BASE_URL, TOKEN } from '../constants';
import { UserData } from '../types/types';

export const getUser = async (params: string) => {
  const token = localStorage.getItem(TOKEN);
  const { data } = await axios.get(`${BASE_URL}${ALL_USERS_URL}/${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const isTokenExpire = async (token: string) => {
  try {
    if (!token) {
      return false;
    }
    await axios.get<UserData[]>(`${BASE_URL}${ALL_USERS_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    }
    return false;
  }
};
