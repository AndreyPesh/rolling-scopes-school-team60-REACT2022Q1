import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_STRING, GENERAL_ERROR_TEXT } from '../../utils/constants';
import { getBoardById } from '../../utils/functions/api';
import { BoardDescription } from '../../utils/types/types';

const INIT_DATA_BOARD = { id: EMPTY_STRING, title: EMPTY_STRING, columns: [] };

export const fetchBoardDataById = createAsyncThunk(
  'boards/fetchBoardDataStatus',
  async ({ token, id }: { token: string; id: string }) => {
    const responseBoardData = await getBoardById(token, id);
    if (responseBoardData) {
      return responseBoardData;
    }
    throw new Error();
  }
);

const initialState: { loading: boolean; boardData: BoardDescription; errors: string } = {
  loading: false,
  boardData: INIT_DATA_BOARD,
  errors: EMPTY_STRING,
};

const currentBoardSlice = createSlice({
  name: 'currentBoard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDataById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchBoardDataById.fulfilled,
      (state, action: PayloadAction<BoardDescription>) => {
        state.loading = false;
        state.boardData = { ...action.payload };
        state.errors = EMPTY_STRING;
      }
    );
    builder.addCase(fetchBoardDataById.rejected, (state) => {
      state.loading = false;
      state.errors = GENERAL_ERROR_TEXT;
    });
  },
});

export default currentBoardSlice.reducer;
