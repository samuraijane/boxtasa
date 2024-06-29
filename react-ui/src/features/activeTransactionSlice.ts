import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore, Transaction } from '../types/interface';

const _initialState: Transaction | null = null;

export const activeTransactionSlice = createSlice({
  name: 'activeTransaction',
  initialState: _initialState,
  reducers: {
    setActiveTransaction: (_, action) => action.payload
  }
});

export const { setActiveTransaction } = activeTransactionSlice.actions;
export const selectActiveTransaction = (state: ReduxStore) => state.activeTransaction;

export default activeTransactionSlice.reducer;
