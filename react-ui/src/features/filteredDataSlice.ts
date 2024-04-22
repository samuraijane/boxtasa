import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { sortByDate } from '../utils';
import { ReduxStore, Transaction } from '../types/interface';

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
    },
    sortFilteredTransactions: (state, action) => {
      const _transactions: Transaction[] = [...action.payload];
      const { sorted } = sortByDate(_transactions);
      return {
        ...state,
        filteredTransactions: sorted
      }
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
    builder.addCase("transactionsByCode/get/fulfilled", (state, action) => {
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
    builder.addCase("transactionsbulk/post/fulfilled", (state, action) => {
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

export const { setSearchTerm, sortFilteredTransactions } = filteredTransactionsSlice.actions;
export const selectFilteredTransactions = (state: ReduxStore) => state.filteredData.filteredTransactions;
export const selectSearchTerm = (state: ReduxStore) => state.filteredData.searchTerm;
export default filteredTransactionsSlice.reducer;
