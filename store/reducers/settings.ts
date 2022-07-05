import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export type Settings = {
  uuid: string;
  email: string;
  username: string;
  role: string;
  lastlogin: Date | null;
};

const initialState: Settings = {
  uuid: '',
  email: '',
  username: 'guest',
  role: 'guest',
  lastlogin: null
};

export const SettingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Settings>) => {
      return state = action.payload;
    },
    initSettings: (state) => {
      return state = initialState;
    }
  }
});

export const { updateSettings, initSettings } = SettingsSlice.actions;
export const selectSettings = (state: RootState) => state.settings;
export default SettingsSlice.reducer;