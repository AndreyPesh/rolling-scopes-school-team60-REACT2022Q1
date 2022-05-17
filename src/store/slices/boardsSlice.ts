import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_STRING, GENERAL_ERROR_TEXT } from '../../utils/constants';
import { getAllBoards } from '../../utils/functions/api';
import { DataBoard } from '../../utils/types/types';

export const fetchListBoards = createAsyncThunk(
  'boards/fetchListBoardsStatus',
  async (token: string) => {
    const result: Array<DataBoard> = [];
    const responseListBoards = await getAllBoards(token);
    if (responseListBoards) {
      result.push(...responseListBoards);
    }
    return result;
  }
);

const initialState: { loading: boolean; listBoards: Array<DataBoard>; errors: string } = {
  loading: false,
  listBoards: [],
  errors: EMPTY_STRING,
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
      state.errors = EMPTY_STRING;
    });
    builder.addCase(fetchListBoards.rejected, (state) => {
      state.loading = false;
      state.errors = GENERAL_ERROR_TEXT;
    });
  },
});

export default boardSlice.reducer;
