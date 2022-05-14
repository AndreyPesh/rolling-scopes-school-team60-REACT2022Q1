import { configureStore } from '@reduxjs/toolkit';
import countReducer from './slices/counter';
import userReducer from './slices/user';

const store = configureStore({
  reducer: {
    count: countReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
