import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllBoards } from '../../utils/functions/api';
import { DataBoard } from '../../utils/types/types';

export const fetchListBoards = createAsyncThunk(
  'boards/fetchListBoardsStatus',
  async (token: string) => {
    const response = await getAllBoards(token);
    if (response) {
      return response;
    }
    return [];
  }
);

const initialState: { loading: boolean; listBoards: Array<DataBoard> } = {
  loading: false,
  listBoards: [],
};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListBoards.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListBoards.fulfilled, (state, action: PayloadAction<Array<DataBoard>>) => {
      state.loading = false;
      state.listBoards = [...action.payload];
    });
  },
});

export default boardSlice.reducer;
