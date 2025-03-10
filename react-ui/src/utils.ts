import {
  Account,
  BulkData,
  GenericObjectStr,
  PostTransaction,
  Total,
  Transaction,
  Vendor
} from "./types/interface";

export const prepBulkData = ({
  codeId,
  labelIds,
  transactions,
  vendorId
}: BulkData): PostTransaction[] => {
  return transactions.map(transaction => ({
    codeId,
    labelIds,
    transactionId: transaction.transaction_id.toString(),
    vendorId
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
    const dateX = parseInt(`${x.year_name}${xMonth}${xDay}`);
    const dateY = parseInt(`${y.year_name}${yMonth}${yDay}`);

    if (dateX < dateY) {
      return -1;
    }
    if (dateX > dateY) {
      return 1;
    }
    return 0;
  });
};

export const _sortByVendorName = (vendors: Vendor[]) => {
  return vendors.sort((a, b) => {
    const nameA = a.vendor_name.toUpperCase();
    const nameB = b.vendor_name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};

/**
 * Sorts an array of objects by up to two values of its keys.
 * @param arr an array of objects
 * @param keys the name of one or two keys upon which sorting is based
 * @example
 * const someData = [{name: "Carlos", age: 19}, {name: "Anna", age: 27}, {name: "Billy", age: 15}];
 * const sorted = sortByKeys(someData, ["name"]);
 * console.log(sorted);
 * // Logs: [{name: "Anna", age: 27}, {name: "Billy", age: 15}, {name: "Carlos", age: 19}];
 * @returns
 */
export const sortByKeys = (arr: GenericObjectStr[], keys: string[]) => { // L2
  const [key1, key2] = keys;

  let result: any[] = [];

  if (key1 && !key2) {
    result = arr.sort((a, b) => (
      a[key1].localeCompare(b[key1])
    ))
  }

  if (key1 && key2) {
    result = arr.sort((a, b) => (
       a[key1].localeCompare(b[key1]) || a[key2].localeCompare(b[key2])
    ));
  }
  
  return result;
};

/**
 * 
 * @todo Consider deprecating this in favor of `sortByKeys()`.
 * @param accounts 
 * @returns 
 */
export const sortByAccountNumber = (accounts: Account[]) => {
  return accounts.sort((a, b) => {
    const nameA = a.acct_no.toUpperCase();
    const nameB = b.acct_no.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
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
      currentYear = x.year_name;
    }
    if (currentYear === x.year_name) {
      currentCount += 1;
      currentTotal += parseInt(x.amount);
    } else {
      totals.push({ count: currentCount, total: currentTotal, year: currentYear });
      currentCount = 1;
      currentTotal = parseInt(x.amount);
      currentYear = x.year_name;
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

export const formatDate = ({ day, month, year } : {day: number, month: number, year: number }) => {
  return `${year}-${month}-${day}`;
};

/**
 * Creates a string with a minimum of six and up to a maximum of twenty
 *   random characters.
 */
export const createId = (length: number): string => {
  if (length > 20) {
    console.warn(`The maximum number of characters allowed is 20. Using '20' instead of ${length} to calcuate an ID.`)
    length = 20;
  }
  if (length < 6) {
    console.warn(`The minimum number of characters required is 6. Using '6' instead of ${length} to calcuate an ID.`)
    length = 6;
  }
  const numA = Math.floor(length/2);
  const numB = length - numA;
  
  return (
    Math.random().toString(36).substring(2, numA) +
    Math.random().toString(36).substring(2, numB)
  );
};

// const amount = 123444;
// console.log(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'}).format(amount));

export const formatCurrency = (value: number) => (
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
);

/*
NOTES

[1]
This ensures that the date from the very last iteration is accounted
for.

[2]
The source for sorting based on two values comes from multiple answers
on Stack Overflow at the URL below.
https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields

*/