import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore } from '../types/interface';

export const getYears = createAsyncThunk('years/get', async () => {
  const response = await fetch('http://localhost:8080/api/years');
  return await response.json();
});

export const yearsSlice = createSlice({
  name: 'years',
  initialState: [],
  reducers: {
    // tbd
  },
  extraReducers(builder) {
    builder.addCase(getYears.fulfilled, (state, action) => {
      return (action.payload);
    });
  }
});

export const selectYears = (state: ReduxStore) => state.years;

export default yearsSlice.reducer;
