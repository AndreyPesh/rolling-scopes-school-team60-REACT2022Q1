import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTokenFromStorage } from '../../utils/functions/localStorage';

interface UserData {
  token: string;
}

const initialState: UserData = {
  token: getTokenFromStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateCurrentToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { updateCurrentToken } = userSlice.actions;

export default userSlice.reducer;
