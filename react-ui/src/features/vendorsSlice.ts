import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore, Vendor } from '../types/interface';
import { _sortByVendorName } from '../utils';

export const getVendors = createAsyncThunk('vendors/get', async (): Promise<Vendor[]> => {
  const response = await fetch('http://localhost:8080/api/vendors');
  return await response.json();
});

export const vendorSlice = createSlice({
  name: 'vendor',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getVendors.fulfilled, (_, action: PayloadAction<Vendor[]>) => (
      // TODO remove `any`
      _sortByVendorName([...action.payload]) as any
    ));
  }
});

export const selectVendor = (state: ReduxStore) => state.vendor;

export default vendorSlice.reducer;
