import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore, TaxesState } from '../types/interface';

export const getTaxSubtotals = createAsyncThunk('tax/subtotals', async (year: number) => {
  if (!year) {
    throw new Error("A year must be included in the HTTP request.");
  }
  const url = `http://localhost:8080/api/tax/subtotals/?year=${year}`;
  const response = await fetch(url);
  return await response.json();
});

const _initialState: TaxesState[] = [];

export const taxesSlice = createSlice({
  name: 'taxes',
  initialState: _initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTaxSubtotals.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectTaxes = (state: ReduxStore) => state.taxes;

export default taxesSlice.reducer;
