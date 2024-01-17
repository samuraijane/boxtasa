import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  initialState: false,
  name: "auth",
  reducers: {
    setAuth: (_, action: PayloadAction<boolean>) => action.payload
  }
});

export const { setAuth } = authSlice.actions;
export const selectAuth = (state: boolean) => state;

export default authSlice.reducer;
