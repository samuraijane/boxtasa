import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStore } from '../types/interface';
import { sortByDate } from '../utils';
import { Transaction } from '../types/interface';
import { PatchTransaction, PostTransaction, SelectorState } from '../types/interface';

interface ActiveDataState {
  transactions: Transaction[];
}

export const deleteTransaction = createAsyncThunk('transaction/delete', async (id: string): Promise<number> => {
  const url = `http://localhost:8080/api/transaction/${id}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "DELETE"
  });
  // TODO type the response
  const { action, id: _id, isSuccess } = await response.json();
  if (isSuccess) {
    return parseInt(_id);
  } else {
    throw new Error("There was a problem deleting the transaction.");
  }
});

export const getTransactionData = createAsyncThunk('transactions/get', async ({
  acctId,
  codeId,
  fixId,
  month,
  year
}: SelectorState) => {
  const queryParams = `${acctId}&codeId=${codeId}&fixId=${fixId}&month=${month}&year=${year}`;
  const url = `http://localhost:8080/api/transactions/?acctId=${queryParams}`;
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
    body: JSON.stringify({ note }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "PATCH"
  });

  return await data.json();
});

export const postTransaction = createAsyncThunk('transactions/post', async (args: PostTransaction, { getState }) => {
  const { codeId, labelIds, transactionId, vendorId } = args;
  const rootState = getState() as ReduxStore;

  const url = `http://localhost:8080/api/transactions/?c=${codeId}&t=${transactionId}&v=${vendorId}`;
  const data = await fetch(url, {
    body: JSON.stringify({ labelIds }),
    headers: {
      "Content-Type": "Application/json"
    },
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

    // TODO
    // Need to investigate this further. The commented out code leaves
    // the active transaction in redux untouched but the commented in
    // code immediately beneath it updates the active transaction.
    // However, because we close the modal after an update, it doesn't
    // really matter. Redux still has the old data but when opening the
    // modal again to see the details, it shows the latest data which is
    // up-to-date because it's pulling it from `filteredTransactions`
    // which has the update thanks to an extra reducer in filteredDataSlice.
    // TL;DR -> we're repeating ourselves and can make things more efficent.

    // builder.addCase(patchTransaction.fulfilled, (state, action) => (
    //   { ...state, transactions: action.payload }
    // ));
    builder.addCase(patchTransaction.fulfilled, (state, action) => {
      const targetIndex = state.transactions.findIndex(x => x.transaction_id === (action.payload as unknown as Transaction).transaction_id);
      const _transactions = [
        ...state.transactions.slice(0, targetIndex),
        action.payload,
        ...state.transactions.slice(targetIndex + 1)
      ];
      return (
        { transactions: _transactions }
      );
    });
    builder.addCase(postTransaction.fulfilled, (state, action) => (
      { ...state, transactions: action.payload }
    ));
    builder.addCase(postTransactionInBulk.fulfilled, (state, action) => {
      return { ...state, transactions: action.payload }
    });
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      const _transactions = current(state).transactions;
      return {
      ...state,
      transactions: _transactions.filter(x => x.transaction_id !== action.payload)
    }});
  }
});

export const selectTransactions = (state: ReduxStore) => state.activeData.transactions;

export default transactionsSlice.reducer;
