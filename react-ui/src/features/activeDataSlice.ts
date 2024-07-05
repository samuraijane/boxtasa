import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore } from '../types/interface';
import { sortByDate } from '../utils';
import { Transaction } from '../types/interface';
import { PatchTransaction, PostTransaction } from '../types/interface';

interface ActiveDataState {
  transactions: Transaction[];
}

export const getTransactionData = createAsyncThunk('transactions/get', async ({ acctId, codeId, year }: {acctId: string, codeId: string, year: string}) => {
  const url = `http://localhost:8080/api/transactions/?acctId=${acctId}&codeId=${codeId}&year=${year}`
  const data = await fetch(url);
  const _transactions = await data.json();
  return {
    transactions: _transactions
  };
});

export const patchTransaction = createAsyncThunk('transactions/patch', async (args: PatchTransaction, { getState }) => {
  const { id, note } = args;

  const url = `http://localhost:8080/api/transaction/${id}`;
  const data = await fetch(url, {
    body: JSON.stringify({note}),
    headers: {
      "Content-Type": "application/json"
    },
    method: "PATCH"
  });

  return await data.json();
});

export const postTransaction = createAsyncThunk('transactions/post', async (args: PostTransaction, { getState }) => {
  const { codeId, transactionId, vendorId } = args;
  const rootState = getState() as ReduxStore;

  const url = `http://localhost:8080/api/transactions/?c=${codeId}&t=${transactionId}&v=${vendorId}`;
  const data = await fetch(url, {
    method: "POST"
  });

  const response = await data.json();

  const _transactions = rootState.activeData.transactions.map(x => {
    if (parseInt(transactionId) !== x.transaction_id) {
      return x;
    }
    return response.updated;
  });

  return sortByDate(_transactions).sorted;
});

export const postTransactionInBulk = createAsyncThunk('transactionsbulk/post', async (args: PostTransaction[], { getState }) => {
  const rootState = getState() as ReduxStore;
  
  const data = await fetch("http://localhost:8080/api/bulk", {
    body: JSON.stringify(args),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  const response = await data.json();

  const keep = rootState.activeData.transactions.filter(x => !(response.updated as Transaction[]).some(y => y.transaction_id === x.transaction_id));
  const _transactions: Transaction[] = keep.concat(response.updated);

  return sortByDate(_transactions).sorted;
});

const _initialState: ActiveDataState = {
  transactions: []
};

export const transactionsSlice = createSlice({
  name: 'activeData',
  initialState: _initialState,
  reducers: {
    setTransactions: (_, action: PayloadAction<any>) => action.payload, // TODO remove `any` type (in a hurry right now)
  },
  extraReducers(builder) {
    builder.addCase(getTransactionData.fulfilled, (state, action) => {
      const { transactions } = action.payload;
      return { ...state, transactions };
    });
    builder.addCase(getTransactionData.rejected, (state, action) => {
      return _initialState; // TODO make this more informative when there is an error
    });
    builder.addCase(patchTransaction.fulfilled, (state, action) => (
      { ...state, transactions: action.payload }
    ));
    builder.addCase(postTransaction.fulfilled, (state, action) => (
      { ...state, transactions: action.payload }
    ));
    builder.addCase(postTransactionInBulk.fulfilled, (state, action) => {
      return { ...state, transactions: action.payload }
    });
  }
});

export const selectTransactions = (state: ReduxStore) => state.activeData.transactions;

export default transactionsSlice.reducer;
