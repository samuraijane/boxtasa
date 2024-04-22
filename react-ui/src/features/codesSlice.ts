import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore } from '../types/interface';

export const getCodes = createAsyncThunk('codes/get', async () => {
  const response = await fetch('http://localhost:8080/api/codes');
  return await response.json();
});

export const codeSlice = createSlice({
  name: 'code',
  initialState: [],
  reducers: {
    // TODO consider whether we want `setCode`
  },
  extraReducers(builder) {
    builder.addCase(getCodes.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectCode = (state: ReduxStore) => state.code;

export default codeSlice.reducer;
