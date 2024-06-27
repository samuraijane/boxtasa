import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore } from '../types/interface';

export const getVendors = createAsyncThunk('vendors/get', async () => {
  const response = await fetch('http://localhost:8080/api/vendors');
  return await response.json();
});

export const vendorSlice = createSlice({
  name: 'vendor',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getVendors.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectVendor = (state: ReduxStore) => state.vendor;

export default vendorSlice.reducer;
