import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './slices/boardsSlice';
import confirmReducer from './slices/confirmSlice';
import currentBoardReducer from './slices/currentBoardSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    boards: boardsReducer,
    currentBoard: currentBoardReducer,
    confirm: confirmReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
