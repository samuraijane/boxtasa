import { Transaction } from "../../../types/interface";

export const TransactionDetail = ({
  account_type_name: acctType,
  acct_no: acctNo,
  amount,
  code_name: codeName,
  date_day: day,
  date_month: month,
  date_year: year,
  short_name: acctName,
  transaction_memo: memo,
  transaction_type_name: transactionType,
  vendor_name: vendor
}: Transaction) => (
  <div className="modal__data">
    <p><span>Account No</span><span>{acctNo}</span></p>
    <p><span>Account Name</span><span>{acctName}</span></p>
    <p><span>Account Type</span><span>{acctType}</span></p>
    <p><span>Year</span><span>{year}</span></p>
    <p><span>Month</span><span>{month}</span></p>
    <p><span>Day</span><span>{day}</span></p>
    <p className="modal__text-full"><span>Memo</span><span>{memo}</span></p>
    <p className="modal__text-full"><span>Vendor</span><span>{vendor}</span></p>
    <p><span>Transaction Type</span><span>{transactionType}</span></p>
    <p><span>Amount</span><span>{amount}</span></p>
    <p><span>Code</span><span>{codeName}</span></p>
  </div>
);
