import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfirmData {
  open: boolean;
  title: string;
  description: string;
  confirmAction: () => void;
}

const initialState: ConfirmData = {
  open: false,
  title: '',
  description: '',
  confirmAction: () => {},
};

const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    close(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
    open(state, action: PayloadAction<ConfirmData>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { close, open } = confirmSlice.actions;

export default confirmSlice.reducer;
