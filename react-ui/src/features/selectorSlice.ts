import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore } from '../types/interface';
import { SelectorState } from '../types/interface';

const _initialState: SelectorState = {
  acctId: 0,
  codeId: 0,
  fixId: 975, // hardcoding the id for UNST for now
  month: 0, // TODO make this to be the current month
  year: 0 // TODO make this to be the current year
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
