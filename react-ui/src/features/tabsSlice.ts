import { createSlice } from '@reduxjs/toolkit';
import { ReduxStore } from '../types/interface';
import { ViewTabs } from '../types/enum';
import { TabState } from '../types/interface';

const _initialState: TabState = {
  activeTab: ViewTabs.TRANSACTIONS
};

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState: _initialState,
  reducers: {
    setTab: (_, action) => ({ activeTab: action.payload })
  }
});

export const { setTab } = tabsSlice.actions;
export const selectTabs = (state: ReduxStore) => state.tabs;

export default tabsSlice.reducer;
