import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../utils/types/types';

interface IUserAction extends UserData {
  isLoading: boolean;
  error: string | null;
}

const initialState: IUserAction = {
  id: '',
  name: '',
  login: '',
  isLoading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserPending: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getUserSuccess: (state, action: PayloadAction<UserData>) => {
      state.isLoading = false;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.login = action.payload.login;
    },
    getUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logOut: (state) => {
      state.id = '';
      state.name = '';
      state.login = '';
    },
  },
});

export const { logOut, getUserPending, getUserSuccess, getUserFail } = userSlice.actions;

export default userSlice.reducer;
