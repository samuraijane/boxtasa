import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore, Vendor } from '../types/interface';
import { _sortByVendorName } from '../utils';

export const deleteVendor = createAsyncThunk('vendors/delete', async (id: string): Promise<Vendor[]> => {
  const url = `http://localhost:8080/api/vendors/${id}`;
  const response = await fetch(url, {
    method: "DELETE"
  });
  return await response.json();
});

export const getVendors = createAsyncThunk('vendors/get', async (): Promise<Vendor[]> => {
  const response = await fetch('http://localhost:8080/api/vendors');
  return await response.json();
});

export const postVendor = createAsyncThunk('transaction/vendor/post', async (vendorName: string): Promise<Vendor[]> => {
  const url = `http://localhost:8080/api/vendors`;
  const data = await fetch(url, {
    body: JSON.stringify({ vendorName }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  return await data.json();
});

export const vendorSlice = createSlice({
  name: 'vendor',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(deleteVendor.fulfilled, (state, action: any) => (
      // TODO remove `any`
      _sortByVendorName([...action.payload]) as any
    ));
    builder.addCase(getVendors.fulfilled, (_, action: PayloadAction<Vendor[]>) => (
      // TODO remove `any`
      _sortByVendorName([...action.payload]) as any
    ));
    builder.addCase(postVendor.fulfilled, (state, action: any) => (
      // TODO remove `any`
      _sortByVendorName([...action.payload]) as any
    ));
  }
});

export const selectVendor = (state: ReduxStore) => state.vendor;

export default vendorSlice.reducer;
