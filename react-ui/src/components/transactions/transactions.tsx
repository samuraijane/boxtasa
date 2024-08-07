import { ChangeEvent, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredTransactions,
  setSearchTerm,
  selectSearchTerm,
  sortFilteredTransactions
} from "../../features/filteredDataSlice";
import { Modal } from "../modal/modal";
import { AppDispatch } from "../../app/store";
import { handleModal, selectIsModal } from "../../features/isModalSlice";
import { selectActiveTransaction, setActiveTransaction } from "../../features/activeTransactionSlice";
import { TransactionUpdateDialogue } from "../update-dialogue/update-dialogue";
import "./transactions.scss";
import { deleteTransaction, selectTransactions } from "../../features/activeDataSlice";

export const Transactions = (): JSX.Element => {
  const activeTransaction = useSelector(selectActiveTransaction);
  const isModal = useSelector(selectIsModal);
  const matchingTransactions = useSelector(selectFilteredTransactions);
  const searchTerm = useSelector(selectSearchTerm);
  const transactionsFromApi = useSelector(selectTransactions);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    dispatch(setSearchTerm(value));
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 8) { // 1
      const newValue = searchTerm.slice(0, searchTerm.length);
      dispatch(setSearchTerm(newValue));
    }
  };

  const handleShowActiveTransaction = (e: MouseEvent<HTMLUListElement>) => {
    if (!(e.target instanceof HTMLElement)) {
      // TODO handle error gracefully
      console.error("Hmmm....");
      return;
    }
    const id = e.target.closest("li")?.dataset.id;
    if (!id) {
      // TODO handle error gracefully
      console.error("There is no id, friend.");
      return;
    }

    if (e.target instanceof HTMLButtonElement && e.target.dataset.type === "delete") {
      dispatch(deleteTransaction(id));
    } else {
      dispatch(handleModal(!isModal));
      const _activeTransaction = matchingTransactions.find(x => x.transaction_id === parseInt(id));
      dispatch(setActiveTransaction(_activeTransaction));
    }
  };

  const handleSort = () => {
    dispatch(sortFilteredTransactions(matchingTransactions));
  };

  const _transactions = matchingTransactions.map((x) => {
    const {
      acct_no: acctNo,
      short_name: acctName,
      account_type_name: acctType,
      date_month: month,
      date_day: day,
      transaction_id: id,
      transaction_memo: memo,
      note,
      transaction_type_name: transactionType,
      amount,
      code_name: codeName,
      vendor_name: vendor,
      year_name: year
    } = x;

    return (
      <li data-id={id} key={id}>  
        <span>{acctNo}</span>
        <div className="transactions__multiline">
          <span>{year}</span>
          <span>{month}/{day}</span>
        </div>
        <div className="transactions__multiline">
          <span>{vendor}</span>
          <span className="transactions__smallish">{memo}</span>
          <span className="transactions__smallish">{note}</span>
        </div>
        <span>{transactionType}</span>
        <span>{amount}</span>
        <span>{codeName}</span>
        <button data-type="delete">Delete</button>
      </li>
    );
  });

  return (
    <div className="transactions">
      {transactionsFromApi.length > 0 && (
        <div className="transactions__subheader">
          <div className="transactions__count"><span>Count:</span>{_transactions.length}</div>
          <div className="transactions__count"><span>Total:</span>{matchingTransactions.reduce((a, b: any) => a + parseInt(b.amount), 0)}</div>
          <div className="transactions__search">
            <input
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Search vendors"
              type="text"
              value={searchTerm}
            />
            <button onClick={handleSort}>Sort</button>
          </div>
        </div>
      )}
      {matchingTransactions.length > 0 &&<ul className="transactions__list" onClick={handleShowActiveTransaction}>{_transactions}</ul>}
      {isModal && activeTransaction && <Modal children={<TransactionUpdateDialogue activeTransaction={activeTransaction} />} />}
    </div>
  );
};

/*
NOTES

[1] This detects when the backspace key is pressed.
*/
