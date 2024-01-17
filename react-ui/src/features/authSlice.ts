import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Auth {
  auth: boolean;
}

export const verifyAuth = createAsyncThunk('auth/verify', async () => {
  const response = await fetch('/api/auth/verify');
  const { isAuth } = await response.json();
  return isAuth;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: false,
  reducers: {
    setAuth: (_, action: PayloadAction<boolean>) => action.payload
  },
  extraReducers(builder) {
    builder.addCase(verifyAuth.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(verifyAuth.rejected, (state, action) => {
      return false;
    });
  }
});

export const { setAuth } = authSlice.actions;
export const selectAuth = (state: Auth) => state.auth;

export default authSlice.reducer;
