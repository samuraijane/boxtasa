import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
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

interface ActiveDataState {
  account: string;
  transactions: Transaction[];
}

export const getTransactionData = createAsyncThunk('transactions/get', async ({ acctName, year }: {acctName: string, year: string}) => {
  const url = `/api/transactions/?acctName=${acctName}&year=${year}`;
  const data = await fetch(url);
  const _transactions = await data.json();
  return {
    account: acctName,
    transactions: _transactions
  };
});

interface PostTransactionCode {
  code: string;
  transactionId: string
}

export const postTransactionCode = createAsyncThunk('transactions/post', async (args: PostTransactionCode, { getState }) => {
  const { code, transactionId } = args;
  const rootState = getState() as RootState;

  const url = `/api/transactions/?a=${rootState.activeData.account}&c=${code}&t=${transactionId}`;
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

  return _transactions;
});

const _initialState: ActiveDataState = {
  account: "",
  transactions: []
};

export const transactionsSlice = createSlice({
  name: 'activeData',
  initialState: _initialState,
  reducers: {
    setTransactions: (_, action: PayloadAction<any>) => action.payload // remove `any` type (in a hurry right now)
  },
  extraReducers(builder) {
    builder.addCase(getTransactionData.fulfilled, (state, action) => {
      const { account, transactions } = action.payload;
      state.account = account;
      state.transactions = transactions;
    });
    builder.addCase(getTransactionData.rejected, (state, action) => {
      return _initialState; // TODO make this more informative when there is an error
    });
    builder.addCase(postTransactionCode.fulfilled, (state, action) => {
      state.transactions = action.payload;
    })
  }
});

export const { setTransactions } = transactionsSlice.actions; // TODO pretty sure we can delete this
export const selectAccount = (state: RootState) => state.activeData.account;
export const selectTransactions = (state: RootState) => state.activeData.transactions;

export default transactionsSlice.reducer;
