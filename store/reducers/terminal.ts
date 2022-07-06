import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export type Config = {
  position: { x: number, y: number };
};

const initialState: Config = {
  position: { x: 140, y: 120 }
};

export const TerminalSlice = createSlice({
  name: 'terminal',
  initialState,
  reducers: {
    updateConfig: (state, action: PayloadAction<Config>) => {
      return state = action.payload;
    },
    initConfig: (state) => {
      return state = initialState;
    }
  }
});

export const { updateConfig, initConfig } = TerminalSlice.actions;
export const selectConfig = (state: RootState) => state.terminal;
export default TerminalSlice.reducer;