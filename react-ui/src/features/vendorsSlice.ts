import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore, Vendor } from '../types/interface';
import { _sortByVendorName } from '../utils';

export const deleteVendor = createAsyncThunk('vendors/delete', async (id: string, thunkAPI): Promise<Vendor[]> => {
  const { baseUrl } = thunkAPI.getState() as ReduxStore;

  const url = `${baseUrl}/api/vendors/${id}`;
  const response = await fetch(url, {
    method: "DELETE"
  });
  return await response.json();
});

export const getVendors = createAsyncThunk('vendors/get', async (_, thunkAPI): Promise<Vendor[]> => {
  const { baseUrl } = thunkAPI.getState() as ReduxStore;

  const response = await fetch(`${baseUrl}/api/vendors`);
  return await response.json();
});

export const postVendor = createAsyncThunk('transaction/vendor/post', async (vendorName: string, thunkAPI): Promise<Vendor[]> => {
  const { baseUrl } = thunkAPI.getState() as ReduxStore;
  
  const url = `${baseUrl}/api/vendors`;
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
      _sortByVendorName([...action.payload]) as any // L1
    ));
    builder.addCase(getVendors.fulfilled, (_, action: PayloadAction<Vendor[]>) => (
      _sortByVendorName([...action.payload]) as any // L1
    ));
    builder.addCase(postVendor.fulfilled, (state, action: any) => (
      _sortByVendorName([...action.payload]) as any //L1
    ));
  }
});

export const selectVendor = (state: ReduxStore) => state.vendor;

export default vendorSlice.reducer;

/*

NOTES

[L1]
TODO – Remove `any`

*/
