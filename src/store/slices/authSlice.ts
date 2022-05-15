import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, SIGNIN_URL, TOKEN } from '../../utils/constants';
import { getTokenFromStorage } from '../../utils/functions/localStorage';
import { DataFormSignin, ErrorResponse, ResponseSignin } from '../../utils/types/types';

interface ILogin {
  isLoading: boolean;
  error: string | null;
  token: string;
}

const initialState: ILogin = {
  isLoading: false,
  error: '',
  token: getTokenFromStorage(),
};

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

export const signIn = createAsyncThunk<ResponseSignin, DataFormSignin, { rejectValue: string }>(
  'auth/signIn',
  async function (formData, { rejectWithValue }) {
    try {
      const response = await axios.post(`${BASE_URL}${SIGNIN_URL}`, formData);

      localStorage.setItem(TOKEN, response.data.token);

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
      localStorage.removeItem(TOKEN);
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
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
