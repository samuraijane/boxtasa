import { Transactions } from "../components/transactions/transactions";
import { DataSelector } from "../components/data-selector/data-selector";

export const TransactionsPage = (): JSX.Element => {
  
  return (
    <>
      <DataSelector />
      <Transactions />
    </>
  )
};
