import { PostTransactionCode } from "./features/activeDataSlice";
import { Transaction } from "./components/transactions/transactions";
import { Total } from "./types/interface";

export const prepBulkData = (transactions: Transaction[], codeId: string): PostTransactionCode[] => {
  return transactions.map(transaction => ({
    account: `${transaction.short_name}${transaction.acct_no}`,
    codeId,
    transactionId: transaction.transaction_id.toString()
  }));
};

const addLeadingZeroMaybe = (digit: number) => {
  if (digit < 10) {
    return `0${digit}`;
  }
  return `${digit}`;
};

const _sortByDate = (transactions: Transaction[]) => {
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

/**
 * The passed-in transactions must already be sorted for this to work as
 *   expected.
 * @param transactions 
 */
const _groupDataByYear = (transactions: Transaction[]) => {
  const length = transactions.length;

  let totals: Total[] = [];
  let currentCount = 0;
  let currentTotal = 0;
  let currentYear = 0;
  let runningCount = 0;

  transactions.forEach(x => {
    runningCount += 1;
    if (!currentYear) {
      currentYear = x.date_year;
    }
    if (currentYear === x.date_year) {
      currentCount += 1;
      currentTotal += parseInt(x.amount);
    } else {
      totals.push({ count: currentCount, total: currentTotal, year: currentYear });
      currentCount = 1;
      currentTotal = parseInt(x.amount);
      currentYear = x.date_year;
    }
    if (length === runningCount) { // 1
      totals.push({ count: currentCount, total: currentTotal, year: currentYear });
    }
  });
  return totals;
}

export const sortByDate = (transactions: Transaction[]) => {
  const sorted = _sortByDate(transactions);
  const totals = _groupDataByYear(sorted);
  return {
    sorted,
    totals
  }
};

/*
NOTES

[1]
This ensures that the date from the very last iteration is accounted
for.

*/