import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { parseJwt } from '../../utils/functions/parseJwt';

const API_URL = 'https://mighty-earth-43476.herokuapp.com';

interface ILogin {
  isLoading: boolean;
  error: string | null;
  userId: string;
}

interface IError {
  response: {
    data: {
      statusCode: number;
      message: string;
    };
  };
}

const initialState: ILogin = {
  isLoading: false,
  error: '',
  userId: '',
};

interface LoginResponse {
  token: string;
}

interface LoginFormData {
  login: string;
  password: string;
}

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

export const signIn = createAsyncThunk<LoginResponse, LoginFormData, { rejectValue: string }>(
  'login/signIn',
  async function (formData, { rejectWithValue }) {
    try {
      const response = await axios.post(`${API_URL}/signin`, formData);
      console.log('asyncThunk', response);

      return response.data;
    } catch (error) {
      const err = error as IError;
      return rejectWithValue(err.response.data.message);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const { userId } = parseJwt(action.payload.token);
        localStorage.setItem('token', action.payload.token);
        state.userId = userId;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default loginSlice.reducer;
