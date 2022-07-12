import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export type ColorScheme = {
  mode: string;
};

const initialState: ColorScheme = {
  mode: 'light'
};

export const ColorSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    updateColor: (state, action: PayloadAction<ColorScheme>) => {
      return state = action.payload;
    }
  }
});

export const { updateColor } = ColorSlice.actions;
export const selectColor = (state: RootState) => state.color;
export default ColorSlice.reducer;