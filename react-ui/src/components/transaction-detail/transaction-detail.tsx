import "./transaction-detail.scss";
import { selectActiveTransaction } from "../../features/activeTransactionSlice";
import { useSelector } from "react-redux";

export const TransactionDetail = () => {
  const activeTransaction = useSelector(selectActiveTransaction);
  const {
    account_type_name: acctType,
    acct_no: acctNo,
    amount,
    code_name: codeName,
    date_day: day,
    date_month: month,
    date_year: year,
    note,
    short_name: acctName,
    transaction_memo: memo,
    transaction_type_name: transactionType,
    vendor_name: vendor
  } = activeTransaction;

  return (
    <div className="transaction-detail">
      <p><span>Account No</span><span>{acctNo}</span></p>
      <p><span>Account Name</span><span>{acctName}</span></p>
      <p><span>Account Type</span><span>{acctType}</span></p>
      <p><span>Year</span><span>{year}</span></p>
      <p><span>Month</span><span>{month}</span></p>
      <p><span>Day</span><span>{day}</span></p>
      <p><span>Vendor</span><span>{vendor}</span></p>
      <p><span>Memo</span><span>{memo}</span></p>
      <p><span>Note</span><span>{note}</span></p>
      <p><span>Transaction Type</span><span>{transactionType}</span></p>
      <p><span>Amount</span><span>{amount}</span></p>
      <p><span>Code</span><span>{codeName}</span></p>
    </div>
  );
};
