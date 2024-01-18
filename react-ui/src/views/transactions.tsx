import { Transactions } from "../components/transactions/transactions";
import { DataSelector } from "../components/data-selector/data-selector";
import { useSelector } from "react-redux";
import { selectAccount } from "../features/activeDataSlice";

export const TransactionsPage = (): JSX.Element => {
  const account = useSelector(selectAccount);
  return (
    <>
      <DataSelector />
      {account && <Transactions />}
    </>
  )
};
