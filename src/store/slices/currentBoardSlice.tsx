import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_STRING, GENERAL_ERROR_TEXT } from '../../utils/constants';
import { createColumn, getBoardById } from '../../utils/functions/api';
import {
  BoardDescription,
  ColumnData,
  RequestColumnData,
  UpdateTaskData,
} from '../../utils/types/types';

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

export const fetchUpdateBoardDataById = createAsyncThunk(
  'boards/fetchUpdateBoardDataStatus',
  async ({ token, id }: { token: string; id: string }) => {
    const responseBoardData = await getBoardById(token, id);
    if (responseBoardData) {
      return responseBoardData;
    }
    throw new Error();
  }
);

export const fetchAddColumn = createAsyncThunk(
  'boards/fetchAddColumnStatus',
  async ({ token, boardId, dataColumn }: RequestColumnData) => {
    const responseCreateColumn = await createColumn({ token, boardId, dataColumn });
    if (responseCreateColumn) {
      return responseCreateColumn;
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
  reducers: {
    updateColumns: (state, action: PayloadAction<Array<ColumnData>>) => {
      state.boardData.columns = [...action.payload];
    },
    updateTasks: (state, action: PayloadAction<UpdateTaskData>) => {
      const { columns } = state.boardData;
      const currentColumn = columns.find((column) => column.id === action.payload.idColumn);
      if (currentColumn) {
        currentColumn.tasks = [...action.payload.tasks];
      }
      return state;
    },
  },
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
    builder.addCase(fetchAddColumn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAddColumn.fulfilled, (state, action: PayloadAction<ColumnData>) => {
      state.loading = false;
      state.boardData.columns.push(action.payload);
      state.errors = EMPTY_STRING;
    });
    builder.addCase(fetchAddColumn.rejected, (state) => {
      state.loading = false;
      state.errors = GENERAL_ERROR_TEXT;
    });
    builder.addCase(
      fetchUpdateBoardDataById.fulfilled,
      (state, action: PayloadAction<BoardDescription>) => {
        state.loading = false;
        state.boardData = { ...action.payload };
        state.errors = EMPTY_STRING;
      }
    );
  },
});

export const { updateColumns, updateTasks } = currentBoardSlice.actions;

export default currentBoardSlice.reducer;
