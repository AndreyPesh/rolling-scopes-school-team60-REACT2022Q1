import axios from 'axios';
import { ALL_USERS_URL, BASE_URL } from '../constants';
import { ErrorResponse, UserData } from '../types/types';
import { getToken } from './localStorage';
import { parseJwt } from './parseJwt';

export const getUser = async () => {
  try {
    const token = getToken();
    const { userId } = parseJwt(token);
    const { data } = await axios.get(`${BASE_URL}${ALL_USERS_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    const err = error as ErrorResponse;
    return err.response.data;
  }
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
