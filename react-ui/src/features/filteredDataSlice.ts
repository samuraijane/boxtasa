import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface Transaction {
  transaction_id: number,
  account_type_name: string,
  short_name: string,
  acct_no: string,
  date_day: number,
  date_month: number,
  date_year: number,
  amount: string;
  transaction_type_name: string;
  transaction_memo: string;
  code_name: string;
}

/**
 * The data from the initial call to the server is handled in a separate
 *   reducer but we cache it here because we want to create the filtered
 *   list while always comparing the search term against the data from
 *   the original call to the server. We could easily separate the
 *   concerns while still keeping everything in just one reducer but we
 *   have opted for completely separate objects for keeping files from
 *   getting too large.
 */
let API_DATA = [] as Transaction[];

export const filteredTransactionsSlice = createSlice({
  name: 'filteredData',
  initialState: [] as Transaction[],
  reducers: {
    getMatchingTransactions: (_, action) => {
      const matches = API_DATA.filter(x => x.transaction_memo.toLowerCase().search(action.payload) !== -1);
      return matches;
    }
  },
  extraReducers(builder) {
    builder.addCase("transactions/get/fulfilled", (_, action) => {
      const transactions = (action as any).payload.transactions;
      API_DATA = transactions;
      // TODO no clue how to type this
      return transactions;
    })
  }
});

export const { getMatchingTransactions } = filteredTransactionsSlice.actions;
export const selectFilteredTransactions = (state: RootState) => state.filteredData;
export default filteredTransactionsSlice.reducer;
