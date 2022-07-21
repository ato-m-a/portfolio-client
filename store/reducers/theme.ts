import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export type Theme = {
  theme: 'dark' | 'light' | 'default';
};

const initialState: Theme = {
  theme: 'default'
};

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<'dark' | 'light' | 'default'>) => {
      state.theme = action.payload;
    }
  }
});

export const { updateTheme } = ThemeSlice.actions;
export const selectConfig = (state: RootState) => state.theme;
export default ThemeSlice.reducer;