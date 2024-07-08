import { useSelector } from "react-redux";
import { selectTransactions } from "../../../features/activeDataSlice";
import { formatDate } from "../../../utils";
import "./transactions-by-code.scss";

export const TransactionsByCode = ({ codeName }: {codeName: string}) => {
  const transactions = useSelector(selectTransactions);

  const _transactions = transactions.filter(x => {
    return x.code_name == codeName
    })
    .map(y => {
      const {
        amount,
        date_day: day,
        date_month: month,
        vendor_name: vendor,
        year_name: year
      } = y;

      const date = formatDate({ day, month, year });

      return (
        <li key={y.transaction_id}>
          <span>{date}</span>
          <span>{vendor}</span>
          <span>{amount}</span>
        </li>
      );
    });

  return (
    <div className="tbc">
      <ul className="tbc__list">{_transactions}</ul>
    </div>
  );
};

/*
NOTES

As of July 4, 2024, you must first load transactions at /transactions
in order for this view to work as expected.

*/
