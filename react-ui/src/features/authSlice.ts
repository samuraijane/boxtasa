import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const viewportSlice = createSlice({
  initialState: false,
  name: "auth",
  reducers: {
    setAuth: (_, action: PayloadAction<boolean>) => action.payload
  }
});

export const { setAuth } = viewportSlice.actions;
export const selectViewport = (state: boolean) => state;

export default viewportSlice.reducer;
