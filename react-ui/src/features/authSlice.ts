import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Auth {
  auth: boolean;
}

export const authSlice = createSlice({
  initialState: false,
  name: "auth",
  reducers: {
    setAuth: (_, action: PayloadAction<boolean>) => action.payload
  }
});

export const { setAuth } = authSlice.actions;
export const selectAuth = (state: Auth) => state.auth;

export default authSlice.reducer;
