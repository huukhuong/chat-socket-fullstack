import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
