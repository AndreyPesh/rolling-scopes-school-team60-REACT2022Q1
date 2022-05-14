import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  name: string;
}

interface IUserAction {
  user: IUser;
  isLoading: boolean;
  error: string;
}

const initialState: IUserAction = {
  user: {
    name: '',
  },
  isLoading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserPending: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = '';
    },
    getUserFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getUserPending, getUserSuccess, getUserFail } = userSlice.actions;

export default userSlice.reducer;
