import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { sortByDate } from '../utils';
import { ReduxStore, Total, Transaction } from '../types/interface';

interface FilteredDataState {
  filteredTransactions: Transaction[];
  searchTerm: string;
  totals?: Total[]
}

const initialState: FilteredDataState = {
  filteredTransactions: [],
  searchTerm: "",
  totals: []
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

const getMatchingTransactions = (searchStr: string, isSearchVendor = true) => {
  if (isSearchVendor) {
    return API_DATA.filter(transactions => transactions.vendor_name.toLowerCase().search(searchStr) !== -1)
  }
  return API_DATA.filter(transactions => transactions.transaction_memo.toLowerCase().search(searchStr) !== -1)
};

export const filteredTransactionsSlice = createSlice({
  name: 'filteredData',
  initialState,
  reducers: {
    clearTotals: (state) => {
      return {
        ...state,
        totals: []
      };
    },
    setSearchTerm: (_, action) => {
      const {value: searchTerm, isSearchVendor} = action.payload;
      const filteredTransactions = getMatchingTransactions(searchTerm, isSearchVendor);

      return {
        filteredTransactions,
        searchTerm
      };
    },
    sortFilteredTransactions: (state, action) => {
      const _transactions: Transaction[] = [...action.payload];
      const { sorted, totals } = sortByDate(_transactions);
      return {
        ...state,
        filteredTransactions: sorted,
        totals
      }
    }
  },
  extraReducers(builder) {
    builder.addCase("transaction/delete/fulfilled", (state, action) => {
      const _transactions = current(state).filteredTransactions;
      return {
      ...state,
      filteredTransactions: _transactions.filter(x => x.transaction_id !== (action as any).payload)
    }});
    builder.addCase("transactions/get/fulfilled", (state, action) => {
      // TODO no clue how to type this
      const filteredTransactions = (action as any).payload.transactions;
      API_DATA = filteredTransactions;
      return {
        ...state,
        filteredTransactions
      };
    });
    builder.addCase("transactions/patch/fulfilled", (state, action) => {
      API_DATA = [(action as any).payload];

      if (state.searchTerm) {
        return {
          ...state,
          filteredTransactions: getMatchingTransactions(state.searchTerm) // L1
        }
      }

      const targetIndex = state.filteredTransactions.findIndex(x => x.transaction_id === ((action as any).payload as unknown as Transaction).transaction_id);
      const _transactions = [
        ...state.filteredTransactions.slice(0, targetIndex),
        (action as any).payload,
        ...state.filteredTransactions.slice(targetIndex + 1)
      ];
      return (
        { ...state, filteredTransactions: _transactions }
      );
    });
    builder.addCase("transactions/post/fulfilled", (state, action) => {
      API_DATA = (action as any).payload;

      if (state.searchTerm) {
        return {
          ...state,
          filteredTransactions: getMatchingTransactions(state.searchTerm) // L1
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
          filteredTransactions: getMatchingTransactions(state.searchTerm) // L1
        }
      }
      
      return {
        ...state,
        filteredTransactions: API_DATA
      };
    });
  }
});

export const { clearTotals, setSearchTerm, sortFilteredTransactions } = filteredTransactionsSlice.actions;
export const selectFilteredTransactions = (state: ReduxStore) => state.filteredData.filteredTransactions;
export const selectSearchTerm = (state: ReduxStore) => state.filteredData.searchTerm;
export const selectTotals = (state: ReduxStore) => state.filteredData.totals;
export default filteredTransactionsSlice.reducer;

/*

NOTES

[L1]
FRAGILE
This may break in the future since we are default to a vendor search.
Not a big deal but it may need to be addressed later.
*/
