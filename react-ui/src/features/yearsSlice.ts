import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore } from '../types/interface';

export const getYears = createAsyncThunk('years/get', async (_, thunkAPI) => {
  const { baseUrl } = thunkAPI.getState() as ReduxStore;

  const response = await fetch(`${baseUrl}/api/years`);
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
