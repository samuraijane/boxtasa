import { createSlice } from '@reduxjs/toolkit';
import { ReduxStore } from '../types/interface';

export const isModalSlice = createSlice({
  name: 'modal',
  initialState: false,
  reducers: {
    handleModal: (_, action) => action.payload
  }
});

export const { handleModal } = isModalSlice.actions;
export const selectIsModal = (state: ReduxStore) => state.isModal;

export default isModalSlice.reducer;
