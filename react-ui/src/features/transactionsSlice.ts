import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface TransactionState {
  transactions: Transaction[];
}

export const getTransactions = createAsyncThunk('transactions/get', async ({ acctName, year }: {acctName: string, year: string}) => {
  const url = `http://localhost:8080/api/transactions/?acctName=${acctName}&year=${year}`;
  const data = await fetch(url);
  return await data.json();
});

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: [],
  reducers: {
    setTransactions: (_, action: PayloadAction<any>) => action.payload // remove `any` type (in a hurry right now)
  },
  extraReducers(builder) {
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(getTransactions.rejected, (state, action) => {
      return [];
    });
  }
});

export const { setTransactions } = transactionsSlice.actions;
export const selectTransactions = (state: TransactionState) => state.transactions;

export default transactionsSlice.reducer;
