import axios from 'axios';
import { getToken } from './localStorage';
import { parseJwt } from './parseJwt';
import { ALL_USERS_URL, BASE_URL, CREATE_BOARD_URL } from '../constants';
import { DataBoard, ErrorResponse, UserData, BoardDescription } from '../types/types';

const logErrors = (nameRequest: string, errorMessage: string) => {
  console.log(`Can't complete request: ${nameRequest} `);
  console.log(`Error: ${errorMessage}`);
};

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

export const getBoardById = async (token: string, id: string) => {
  try {
    if (!token) {
      return false;
    }

    const { data } = await axios.get<BoardDescription>(`${BASE_URL}${CREATE_BOARD_URL}/${id}`, {
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

export const removeBoardById = async (token: string, id: string) => {
  try {
    if (!token) {
      return false;
    }

    await axios.delete<BoardDescription>(`${BASE_URL}${CREATE_BOARD_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logErrors(removeBoardById.name, error.message);
    }
    return false;
  }
};
