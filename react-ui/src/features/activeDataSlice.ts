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

export const getTransactionData = createAsyncThunk('transactions/get', async ({ isBulk=false, acctName, year }: {acctName: string, isBulk?: boolean; year: string}) => {
  const url = !isBulk
    ? `http://localhost:8080/api/transactions/?acctName=${acctName}&year=${year}`
    : `http://localhost:8080/api/bulk`;
  const data = await fetch(url);
  const _transactions = await data.json();
  return {
    account: acctName,
    transactions: _transactions
  };
});

export const getTransactionsByCode = createAsyncThunk('transactionsByCode/get', async ({ code }: {code: string}) => {
  if (!code) {
    console.error("Field for code is empty.")
    return {
      transactions: []
    };
  }
  const url = `http://localhost:8080/api/transactions-by-code/?code=${code}`;
  const data = await fetch(url);
  const _transactions = await data.json();
  return {
    transactions: _transactions
  };
});

export interface PostTransactionCode {
  account?: string; // TODO consider an enum here
  code: string;
  transactionId: string
}

export const postTransactionCode = createAsyncThunk('transactions/post', async (args: PostTransactionCode, { getState }) => {
  const { code, transactionId } = args;
  const rootState = getState() as RootState;

  const url = `http://localhost:8080/api/transactions/?a=${rootState.activeData.account}&c=${code}&t=${transactionId}`;
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

  return _transactions.sort((x, y) => { // TODO consider making this a util
    const textX = x.code_name.toUpperCase();
    const textY = y.code_name.toUpperCase();
    if (textX < textY) {
      return 1;
    }
    if (textX > textY) {
      return -1;
    }
    return 0;
  });
});

export const postTransactionCodesInBulk = createAsyncThunk('transactionsbulk/post', async (args: PostTransactionCode[], { getState }) => {
  const rootState = getState() as RootState;
  
  const data = await fetch("http://localhost:8080/api/bulk", {
    body: JSON.stringify(args),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  const response = await data.json();

  const keep = rootState.activeData.transactions.filter(x => !(response.updated as Transaction[]).some(y => y.transaction_id === x.transaction_id));
  const _transactions: Transaction[] = keep.concat(response.updated).sort((x, y) => x.transaction_id - y.transaction_id);

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
    setActiveAccount: (state, action) => {
      return {
        ...state,
        account: action.payload
      }
    },
    setTransactions: (_, action: PayloadAction<any>) => action.payload, // remove `any` type (in a hurry right now)
  },
  extraReducers(builder) {
    builder.addCase(getTransactionData.fulfilled, (state, action) => {
      const { account, transactions } = action.payload;
      return { ...state, account, transactions };
    });
    builder.addCase(getTransactionData.rejected, (state, action) => {
      return _initialState; // TODO make this more informative when there is an error
    });
    builder.addCase(getTransactionsByCode.fulfilled, (state, action) => {
      const { transactions } = action.payload;
      return { ...state, transactions };
    });
    builder.addCase(postTransactionCode.fulfilled, (state, action) => (
      { ...state, transactions: action.payload }
    ));
    builder.addCase(postTransactionCodesInBulk.fulfilled, (state, action) => {
      return { ...state, transactions: action.payload }
    });
  }
});

export const { setActiveAccount, setTransactions } = transactionsSlice.actions; // TODO pretty sure we can delete this
export const selectAccount = (state: RootState) => state.activeData.account;
export const selectTransactions = (state: RootState) => state.activeData.transactions;

export default transactionsSlice.reducer;
