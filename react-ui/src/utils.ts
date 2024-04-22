import { PostTransactionCode } from "./features/activeDataSlice";
import { Transaction } from "./components/transactions/transactions";

export const prepBulkData = (transactions: Transaction[], code: string): PostTransactionCode[] => {
  return transactions.map(transaction => ({
    account: `${transaction.short_name}${transaction.acct_no}`,
    code,
    transactionId: transaction.transaction_id.toString()
  }));
};

const addLeadingZeroMaybe = (digit: number) => {
  if (digit < 10) {
    return `0${digit}`;
  }
  return `${digit}`;
};

export const sortByDate = (transactions: Transaction[]) => {
  return transactions.sort((x, y) => {
    const xMonth = addLeadingZeroMaybe(x.date_month);
    const xDay = addLeadingZeroMaybe(x.date_day);
    const yMonth = addLeadingZeroMaybe(y.date_month);
    const yDay = addLeadingZeroMaybe(y.date_day);
    const dateX = parseInt(`${x.date_year}${xMonth}${xDay}`);
    const dateY = parseInt(`${y.date_year}${yMonth}${yDay}`);

    if (dateX < dateY) {
      return -1;
    }
    if (dateX > dateY) {
      return 1;
    }
    return 0;
  });
};