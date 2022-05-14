import axios from 'axios';
import { ALL_USERS_URL, BASE_URL, CREATE_BOARD_URL, SIGNIN_URL } from '../constants';
import { DataFormSignin, DataBoard, ResponseSignin, UserData } from '../types/types';

const logErrors = (nameRequest: string, errorMessage: string) => {
  console.log(`Can't complete request: ${nameRequest} `);
  console.log(`Error: ${errorMessage}`);
};

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
      logErrors(signin.name, error.message);
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
      logErrors(isTokenExpire.name, error.message);
    }
    return false;
  }
};

export const createBoard = async (token: string, title: string) => {
  try {
    if (!token) {
      return false;
    }

    await axios.post<DataBoard>(
      `${BASE_URL}${CREATE_BOARD_URL}`,
      { title },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logErrors(createBoard.name, error.message);
    }
    return false;
  }
};

export const getAllBoards = async (token: string) => {
  try {
    if (!token) {
      return false;
    }

    const { data } = await axios.get<DataBoard[]>(`${BASE_URL}${CREATE_BOARD_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logErrors(createBoard.name, error.message);
    }
    return false;
  }
};
