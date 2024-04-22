import { PostTransactionCode } from "./features/activeDataSlice";
import { Transaction } from "./components/transactions/transactions";

interface Totals {
  count: number;
  total: number;
  year: number;
}

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
  const sorted = transactions.sort((x, y) => {
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

  let totals: Totals[] = [];
  let currentCount = 0;
  let currentTotal = 0;
  let currentYear = 0;
  let runningCount = 0;
  const length = sorted.length;

  sorted.forEach(x => {
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

  return {sorted, totals};
};

/*
NOTES

[1]
This ensures that the date from the very last iteration is accounted
for.

*/