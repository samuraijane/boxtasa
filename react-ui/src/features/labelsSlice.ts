import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore } from '../types/interface';

export const getLabels = createAsyncThunk('labels/get', async (_, thunkAPI) => {
  const { baseUrl } = thunkAPI.getState() as ReduxStore;
  
  const response = await fetch(`${baseUrl}/api/labels`);
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
