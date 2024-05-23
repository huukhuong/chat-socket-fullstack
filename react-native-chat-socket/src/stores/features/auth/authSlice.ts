import { UserModel } from '@models/UserModel';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  currentUser: undefined | null | UserModel;
}

const initialState: CounterState = {
  currentUser: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (
      state,
      action: PayloadAction<undefined | null | UserModel>,
    ) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
