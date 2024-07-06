import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Month, ReduxStore } from '../types/interface';
import months from "../data/months.json";

const _initialState: Month[] = months;

export const monthsSlice = createSlice({
  name: 'months',
  initialState: _initialState,
  reducers: {
    // not necessary but an empty `reducers` object keeps TS happy
  }
});

export const selectMonths = (state: ReduxStore) => state.months;

export default monthsSlice.reducer;

/*
NOTE

Arguably overkill but there is no need to put months in the database yet
at the same time we need month data cached app-wide.
*/
