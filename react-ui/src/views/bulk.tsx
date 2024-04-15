import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Transactions } from "../components/transactions/transactions";
import { getTransactionData } from "../features/activeDataSlice";
import { selectTransactions } from "../features/activeDataSlice";
import { AppDispatch } from "../app/store";

export const BulkPage = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    dispatch(getTransactionData({ acctName: "", isBulk: true, year: "" }));
  }, []);
  
  return (
    <div className="bulk">
     {transactions.length && <Transactions />}
    </div>
  );
};
