import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICount {
  value: number;
}

const initialState: ICount = {
  value: 10,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    decrement(state, action: PayloadAction<number>) {
      state.value -= action.payload;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
