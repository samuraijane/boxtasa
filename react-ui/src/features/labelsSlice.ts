import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore } from '../types/interface';

export const getLabels = createAsyncThunk('labels/get', async () => {
  const response = await fetch('http://localhost:8080/api/labels');
  return await response.json();
});

export const labelsSlice = createSlice({
  name: 'labels',
  initialState: [],
  reducers: {
    // TODO consider whether we want `setCode`
  },
  extraReducers(builder) {
    builder.addCase(getLabels.fulfilled, (_, action) => {
      return action.payload;
    });
  }
});

export const selectLabels = (state: ReduxStore) => state.labels;

export default labelsSlice.reducer;
