import { ChangeEvent, MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredTransactions,
  setSearchTerm,
  selectSearchTerm
} from "../../features/filteredDataSlice";
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
  const matchingTransactions = useSelector(selectFilteredTransactions);
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch<AppDispatch>();

  const [activeTransaction, setActiveTransaction] = useState<Transaction>();
  const [isModalActive, setIsModalActive] =useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    dispatch(setSearchTerm(value));
  };

  const handleClick = async (transactionId: string, code: string) => {
    await dispatch(postTransactionCode({ code, transactionId }));
    setIsModalActive(false);
  };

  const handleKeyDown = (e: any) => {
    // handle backspace here
    if (e.keyCode === 8) {
      const newValue = searchTerm.slice(0, searchTerm.length);
      dispatch(setSearchTerm(newValue));
    }
  };

  const handleModal = (e: MouseEvent<HTMLLIElement>) => {
    const { id } = e.currentTarget.dataset;
    if (!id) {
      console.error("There is no id, friend."); // TODO handle error gracefully
      return;
    }
    setIsModalActive(!isModalActive);
    setActiveTransaction(matchingTransactions.find(x => {
      return x.transaction_id === parseInt(id);
    }));
  };

  const _transactions = matchingTransactions.map((x) => {
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
    <div className="transactions">
      <div className="transactions__search">
        <input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search memos"
          type="text"
          value={searchTerm}
        />
      </div>
      <ul className="transactions__list">{_transactions}</ul>
      {isModalActive && activeTransaction && <Modal action={handleClick} data={activeTransaction}/>}
    </div>
  );
};
