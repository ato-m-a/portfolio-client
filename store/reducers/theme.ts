import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export type Theme = {
  theme: 'dark' | 'light' | 'default';
}


const initialState: Theme = {
  theme: 'default'
};

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    enableDark(state) {
      state.theme = 'dark';
    },
    enableLight(state) {
      state.theme = 'light';
    }
  }
});

export const { enableDark, enableLight } = ThemeSlice.actions;
export const selectTheme = (state: RootState) => state.theme;
export default ThemeSlice.reducer;