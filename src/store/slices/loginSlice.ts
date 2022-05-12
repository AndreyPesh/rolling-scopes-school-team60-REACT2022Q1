import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILogin {
  isLoading: boolean;
  isAuth: boolean;
  error: string;
}

const initialState: ILogin = {
  isLoading: false,
  isAuth: false,
  error: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = '';
      localStorage.setItem('token', action.payload);
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = action.payload;
    },
  },
});

export const { loginPending, loginSuccess, loginFail } = loginSlice.actions;

export default loginSlice.reducer;
