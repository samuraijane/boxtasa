import { useSelector } from "react-redux";
import { selectTransactions } from "../../../features/activeDataSlice";
import { formatDate } from "../../../utils";
import "./transactions-by-vendor.scss";

export const TransactionsByVendor = ({ vendorName }: {vendorName: string}) => {
  const transactions = useSelector(selectTransactions);

  const _transactions = transactions.filter(x => {
    return x.vendor_name == vendorName
    })
    .map(y => {
      const {
        amount,
        code_name: code,
        date_day: day,
        date_month: month,
        date_year: year
      } = y;

      const date = formatDate({ day, month, year });

      return (
        <li key={y.transaction_id}>
          <span>{date}</span>
          <span>{amount}</span>
          <span>{code}</span>
        </li>
      );
    });

  return (
    <div className="tbv">
      <ul className="tbv__list">{_transactions}</ul>
    </div>
  );
};

/*
NOTES

As of July 4, 2024, you must first load transactions at /transactions
in order for this view to work as expected.

*/
