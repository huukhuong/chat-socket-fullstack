import { UserModel } from '@models/UserModel';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@stores/appStore';

interface CounterState {
  currentUser: null | UserModel;
}

const initialState: CounterState = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<null | UserModel>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;

export const selectCount = (state: RootState) => state.auth.currentUser;

export default authSlice.reducer;
