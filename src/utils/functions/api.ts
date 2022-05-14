import axios from 'axios';
import { ALL_USERS_URL, BASE_URL, SIGNIN_URL } from '../constants';
import { DataFormSignin, ResponseSignin, UserData } from '../types/types';

export const signin = async (dataForm: DataFormSignin) => {
  try {
    const { data } = await axios.post<ResponseSignin>(`${BASE_URL}${SIGNIN_URL}`, dataForm, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    }
    return null;
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
