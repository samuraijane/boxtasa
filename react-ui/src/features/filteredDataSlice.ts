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

interface FilteredDataState {
  filteredTransactions: Transaction[];
  searchTerm: string;
}

const initialState: FilteredDataState = {
  filteredTransactions: [],
  searchTerm: ""
};

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

const getMatchingTransactions = (searchStr: string) => (
  API_DATA.filter(transactions => transactions.transaction_memo.toLowerCase().search(searchStr) !== -1)
);

export const filteredTransactionsSlice = createSlice({
  name: 'filteredData',
  initialState,
  reducers: {
    setSearchTerm: (_, action) => {
      const searchTerm = action.payload;
      const filteredTransactions = getMatchingTransactions(searchTerm);

      return {
        filteredTransactions,
        searchTerm
      };
    }
  },
  extraReducers(builder) {
    builder.addCase("transactions/get/fulfilled", (state, action) => {
      // TODO no clue how to type this
      const filteredTransactions = (action as any).payload.transactions;
      API_DATA = filteredTransactions;
      return {
        ...state,
        filteredTransactions
      };
    });
    builder.addCase("transactions/post/fulfilled", (state, action) => {
      API_DATA = (action as any).payload;

      if (state.searchTerm) {
        return {
          ...state,
          filteredTransactions: getMatchingTransactions(state.searchTerm)
        }
      }
      
      return {
        ...state,
        filteredTransactions: API_DATA
      };
    });
  }
});

export const { setSearchTerm } = filteredTransactionsSlice.actions;
export const selectFilteredTransactions = (state: RootState) => state.filteredData.filteredTransactions;
export const selectSearchTerm = (state: RootState) => state.filteredData.searchTerm;
export default filteredTransactionsSlice.reducer;
