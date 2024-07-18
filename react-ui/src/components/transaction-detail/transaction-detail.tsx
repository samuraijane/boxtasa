import { ChangeEvent, MouseEvent, useState } from "react";
import "./transaction-detail.scss";
import { selectActiveTransaction } from "../../features/activeTransactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { NoteInput } from "./subcomponents/noteInput";
import { AppDispatch } from "../../app/store";
import { patchTransaction } from "../../features/activeDataSlice";
import { handleModal } from "../../features/isModalSlice";
import { NotePatchOptions } from "../../types/enum";

export const TransactionDetail = () => {
  const activeTransaction = useSelector(selectActiveTransaction);
  const dispatch = useDispatch<AppDispatch>();
  const [isEditNote, setIsEditNote] = useState(false);
  const [noteValue, setNoteValue] = useState(activeTransaction.note);

  const {
    account_type_name: acctType,
    acct_no: acctNo,
    amount,
    code_name: codeName,
    date_day: day,
    date_month: month,
    labels,
    note,
    short_name: acctName,
    transaction_memo: memo,
    transaction_id: id,
    transaction_type_name: transactionType,
    vendor_name: vendor,
    year_name: yearName
  } = activeTransaction;

  const handleChange = (e: ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    const { value } = e.target;
    setNoteValue(value);
  }

  const handleClick = (e: MouseEvent<HTMLSpanElement>) => {
    if (!(e.target instanceof HTMLHeadingElement)) {
      return;
    }
    setIsEditNote(!isEditNote);
  };

  const handleInput = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (!(e.target instanceof HTMLDivElement || e.target instanceof HTMLButtonElement)) {
      return;
    }

    const { type } = e.target.dataset;
    if (!type) {
      return;
    }
    
    if (type === NotePatchOptions.CANCEL) {
      setIsEditNote(false);
    }

    if (type === NotePatchOptions.SAVE) {
      dispatch(patchTransaction({ id, note: noteValue }));
    }
  };

  return (
    <div className="transaction-detail">
      <div className="transaction-detail__field transaction-detail__field--first">
        <h3>Account No</h3>
        <div>{acctNo}</div>
      </div>
      <div className="transaction-detail__field">
        <h3>Account Name</h3>
        <div>{acctName}</div>
      </div>
      <div className="transaction-detail__field">
        <h3>Account Type</h3>
        <div>{acctType}</div>
      </div>
      <div className="transaction-detail__field">
        <h3>Year</h3>
        <div>{yearName}</div>
      </div>
      <div className="transaction-detail__field">
        <h3>Month</h3>
        <div>{month}</div>
      </div>
      <div className="transaction-detail__field">
        <h3>Day</h3>
        <div>{day}</div>
      </div>
      <div className="transaction-detail__field">
        <h3>Vendor</h3>
        <div>{vendor}</div>
      </div>
      <div className="transaction-detail__field">
        <h3>Memo</h3>
        <div>{memo}</div>
      </div>
      <div className="transaction-detail__input-outer">
        <div className="transaction-detail__input-inner">
          <h3 onClick={handleClick}>Note</h3>
          {
            !isEditNote
            ? <h3 className="transaction-detail__input-read-only">{note}</h3>
            : <NoteInput handleChange={handleChange} handleInput={handleInput} value={noteValue} />
          }
        </div>
      </div>
      <div className="transaction-detail__field">
        <h3>Transaction Type</h3>
        <div>{transactionType}</div>
      </div>
      <div className="transaction-detail__field">
        <h3>Amount</h3>
        <div>{amount}</div>
      </div>
      <div className="transaction-detail__field">
        <h3>Code</h3>
        <div>{codeName}</div>
      </div>
      <div className="transaction-detail__field">
        <h3>Labels</h3>
        <div>{labels.join(", ")}</div>
      </div>
    </div>
  );
};
