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
    if (!(e.target instanceof HTMLSpanElement)) {
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
      dispatch(handleModal(false));
    }
  };

  return (
    <div className="transaction-detail">
      <p><span>Account No</span><span>{acctNo}</span></p>
      <p><span>Account Name</span><span>{acctName}</span></p>
      <p><span>Account Type</span><span>{acctType}</span></p>
      <p><span>Year</span><span>{yearName}</span></p>
      <p><span>Month</span><span>{month}</span></p>
      <p><span>Day</span><span>{day}</span></p>
      <p><span>Vendor</span><span>{vendor}</span></p>
      <p><span>Memo</span><span>{memo}</span></p>
      <div>
        <span>Note</span>
        {
          !isEditNote
          ? <span onClick={handleClick}>{note}</span>
          : <NoteInput handleChange={handleChange} handleInput={handleInput} value={noteValue} />
        }
      </div>
      <p><span>Transaction Type</span><span>{transactionType}</span></p>
      <p><span>Amount</span><span>{amount}</span></p>
      <p><span>Code</span><span>{codeName}</span></p>
    </div>
  );
};
