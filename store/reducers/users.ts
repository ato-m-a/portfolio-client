import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export type User = {
  uuid: string;
  email: string;
  username: string;
  role: string;
};

const initialState: User = {
  uuid: '',
  email: '',
  username: 'guest',
  role: 'guest'
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      return state = action.payload;
    },
    vacateUser: (state) => {
      return state = initialState;
    }
  }
});

export const { updateUser, vacateUser } = UserSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default UserSlice.reducer;