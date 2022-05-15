import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, SIGNIN_URL, SIGNUP_URL } from '../../utils/constants';
import { isError } from '../../utils/functions/isError';
import { getToken, removeToken, setToken } from '../../utils/functions/localStorage';
import {
  DataFormSignIn,
  DataFormSignUp,
  ErrorResponse,
  ResponseSignIn,
  ResponseSignUp,
} from '../../utils/types/types';

interface ILogin {
  isLoading: boolean;
  error: string | null;
  token?: string;
  name?: string;
  login?: string;
}

const initialState: ILogin = {
  isLoading: false,
  error: '',
  token: getToken(),
  name: '',
  login: '',
};

export const signIn = createAsyncThunk<ResponseSignIn, DataFormSignIn, { rejectValue: string }>(
  'auth/signIn',
  async function (formData, { rejectWithValue }) {
    try {
      const response = await axios.post(`${BASE_URL}${SIGNIN_URL}`, formData);

      setToken(response.data.token);

      return response.data;
    } catch (error) {
      const err = error as ErrorResponse;
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const signUp = createAsyncThunk<ResponseSignUp, DataFormSignUp, { rejectValue: string }>(
  'auth/signUp',
  async function (formData, { rejectWithValue }) {
    try {
      const response = await axios.post(`${BASE_URL}${SIGNUP_URL}`, formData);

      return response.data;
    } catch (error) {
      const err = error as ErrorResponse;
      return rejectWithValue(err.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      state.token = '';
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.login = action.payload.login;
        state.name = action.payload.name;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
