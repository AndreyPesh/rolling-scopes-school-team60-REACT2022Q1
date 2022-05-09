import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
  token: string;
}

const initialState: UserData = {
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
