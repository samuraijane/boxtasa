import { ChangeEvent, MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredTransactions,
  setSearchTerm,
  selectSearchTerm,
  sortFilteredTransactions
} from "../../features/filteredDataSlice";
import { Modal } from "../modal/modal";
import { postTransactionCode, setActiveAccount } from "../../features/activeDataSlice";
import { AppDispatch } from "../../app/store";
import "./transactions.scss";
import { PostTransactionCode, postTransactionCodesInBulk } from "../../features/activeDataSlice";

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

  const handleClick = async (data: PostTransactionCode | PostTransactionCode[]) => {
    if ((data as PostTransactionCode[]).length) {
      await dispatch(postTransactionCodesInBulk(data as PostTransactionCode[]));
      setIsModalActive(false);
    } else {
      const { code, transactionId } = data as PostTransactionCode;
      await dispatch(postTransactionCode({ code, transactionId }));
      setIsModalActive(false);
    }
  };

  const handleKeyDown = (e: any) => {
    // handle backspace here
    if (e.keyCode === 8) {
      const newValue = searchTerm.slice(0, searchTerm.length);
      dispatch(setSearchTerm(newValue));
    }
  };

  const handleModal = (e: MouseEvent<HTMLLIElement>) => {
    const id = (e.currentTarget.dataset.id as string).split("-")[0];
    if (!id) {
      console.error("There is no id, friend."); // TODO handle error gracefully
      return;
    }
    setIsModalActive(!isModalActive);
    const _activeTransaction = matchingTransactions.find(x => x.transaction_id === parseInt(id));
    dispatch(setActiveAccount(`${_activeTransaction?.short_name}${_activeTransaction?.acct_no}`))
    setActiveTransaction(_activeTransaction);
  };

  const handleSort = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(sortFilteredTransactions(matchingTransactions));
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

    const _id = `${id}-${acctName}${acctNo}`;

    return (
      <li key={_id}>  
        <span>{acctNo}</span>
        <span>{acctName}</span>
        <span>{acctType}</span>
        <span>{year}</span>
        <span>{month}</span>
        <span>{day}</span>
        <span>{memo}</span>
        <span>{transactionType}</span>
        <span>{amount}</span>
        <span className="transactions__amount" data-id={_id} onClick={handleModal}>{codeName}</span>
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
        <button onClick={handleSort}>Sort</button>
      </div>
      <ul className="transactions__list">{_transactions}</ul>
      {isModalActive && activeTransaction && <Modal action={handleClick} data={activeTransaction}/>}
    </div>
  );
};
