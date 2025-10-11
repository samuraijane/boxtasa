import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore } from '../types/interface';

interface Auth {
  auth: boolean;
}

export const verifyAuth = createAsyncThunk('auth/verify', async (_ ,thunkAPI) => {
  const { baseUrl } = thunkAPI.getState() as ReduxStore;

  const response = await fetch(`${baseUrl}/api/auth/verify`);
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
    // TODO account for pending state
    // builder.addCase(verifyAuth.pending, (state, action) => {
    //   return action.payload;
    // });
    builder.addCase(verifyAuth.rejected, (state, action) => {
      return false;
    });
  }
});

export const { setAuth } = authSlice.actions;
export const selectAuth = (state: Auth) => state.auth;

export default authSlice.reducer;
