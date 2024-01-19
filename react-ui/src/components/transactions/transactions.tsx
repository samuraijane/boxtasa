import { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTransactions } from "../../features/activeDataSlice";
import { Modal } from "../modal/modal";
import { postTransactionCode } from "../../features/activeDataSlice";
import { AppDispatch } from "../../app/store";
import "./transactions.scss";

export interface Transaction {
  acct_no: string;
  short_name: string;
  account_type_name: string;
  date_year: number;
  date_month: number;
  date_day: number;
  transaction_id: number;
  transaction_memo: string;
  transaction_type_name: string;
  amount: string;
  code_name: string;
}

export const Transactions = (): JSX.Element => {
  const [isModalActive, setIsModalActive] =useState(false);
  const [activeTransaction, setActiveTransaction] = useState<Transaction>();

  const transactions = useSelector(selectTransactions);

  const dispatch = useDispatch<AppDispatch>();



  const handleClick = async (transactionId: string, code: string) => {
    await dispatch(postTransactionCode({ code, transactionId }))
    setIsModalActive(false);
  };

  const handleModal = (e: MouseEvent<HTMLLIElement>) => {
    const { id } = e.currentTarget.dataset;
    if (!id) {
      console.error("There is no id, friend."); // TODO handle error gracefully
      return;
    }
    setIsModalActive(!isModalActive);
    setActiveTransaction(transactions.find(x => {
      return x.transaction_id === parseInt(id);
    }));
  };

  const _transactions = transactions.map((x) => {
    const {
      acct_no: acctNo,
      short_name: acctName,
      account_type_name: acctType,
      date_year: year,
      date_month: month,
      date_day: day,
      transaction_id: id,
      transaction_memo: memo,
      transaction_type_name: transactionType,
      amount,
      code_name: codeName
    } = x;
    return (
      <li data-id={id} key={id} onClick={handleModal}>  
        <span>{acctNo}</span>
        <span>{acctName}</span>
        <span>{acctType}</span>
        <span>{year}</span>
        <span>{month}</span>
        <span>{day}</span>
        <span>{memo}</span>
        <span>{transactionType}</span>
        <span>{amount}</span>
        <span>{codeName}</span>
      </li>
    );
  });

  return (
    <main className="y-wrap">
      <ul className="transactions">{_transactions}</ul>
      {isModalActive && activeTransaction && <Modal action={handleClick} data={activeTransaction}/>}
    </main>
  );
};
