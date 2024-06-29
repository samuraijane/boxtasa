import { Transactions } from "../components/transactions/transactions";
import { DataSelector } from "../components/data-selector/data-selector";
import { useSelector } from "react-redux";
import { selectFilteredTransactions } from "../features/filteredDataSlice";


export const TransactionsPage = (): JSX.Element => (
  <>
    <DataSelector />
    <Transactions />
  </>
);
