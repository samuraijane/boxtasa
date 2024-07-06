import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore } from '../types/interface';
import { SelectorState } from '../types/interface';

const _initialState: SelectorState = {
  acctId: 2,
  codeId: 0,
  year: 2024
};

export const selectorSlice = createSlice({
  name: 'selector',
  initialState: _initialState,
  reducers: {
    setSelector: (_, action) => action.payload
  }
});

export const selectSelector = (state: ReduxStore) => state.selector;
export const { setSelector } = selectorSlice.actions;

export default selectorSlice.reducer;
