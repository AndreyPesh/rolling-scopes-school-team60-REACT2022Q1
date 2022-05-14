import { configureStore } from '@reduxjs/toolkit';
import countReducer from './slices/counter';
import userReducer from './slices/user';
import boardsReducer from './slices/boards';

const store = configureStore({
  reducer: {
    count: countReducer,
    user: userReducer,
    boards: boardsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
