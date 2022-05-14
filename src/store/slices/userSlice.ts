import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserAction {
  userId: string;
  isLoading: boolean;
  error: string;
}

const initialState: IUserAction = {
  userId: '',
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
    getUserSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.userId = action.payload;
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
