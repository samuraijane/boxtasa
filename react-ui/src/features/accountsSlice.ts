import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore } from '../types/interface';

export const getAccounts = createAsyncThunk('accounts/get', async (_, thunkAPI) => {
  const { baseUrl } = thunkAPI.getState() as ReduxStore;

  const response = await fetch(`${baseUrl}/api/accounts`);
  return await response.json();
});

export const accountSlice = createSlice({
  name: 'account',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAccounts.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectAccounts = (state: ReduxStore) => state.account;

export default accountSlice.reducer;
