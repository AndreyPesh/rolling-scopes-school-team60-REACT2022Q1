import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllBoards, getBoardById } from '../../utils/functions/api';
import { BoardDescription } from '../../utils/types/types';

export const fetchListBoards = createAsyncThunk(
  'boards/fetchListBoardsStatus',
  async (token: string) => {
    const result: Array<BoardDescription> = [];
    const responseListBoards = await getAllBoards(token);
    if (responseListBoards) {
      const boardItemsData = await Promise.all(
        responseListBoards.map((boardData) => getBoardById(token, boardData.id))
      );
      if (boardItemsData.every((data) => data)) {
        result.push(...(boardItemsData as BoardDescription[]));
      }
    }
    return result;
  }
);

const initialState: { loading: boolean; listBoards: Array<BoardDescription> } = {
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
    builder.addCase(
      fetchListBoards.fulfilled,
      (state, action: PayloadAction<Array<BoardDescription>>) => {
        state.loading = false;
        state.listBoards = [...action.payload];
      }
    );
  },
});

export default boardSlice.reducer;
