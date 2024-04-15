import { PostTransactionCode } from "./features/activeDataSlice";
import { Transaction } from "./components/transactions/transactions";

export const prepBulkData = (transactions: Transaction[], code: string): PostTransactionCode[] => {
  return transactions.map(transaction => ({
    account: `${transaction.short_name}${transaction.acct_no}`,
    code,
    transactionId: transaction.transaction_id.toString()
  }));
};
