import { MouseEventHandler } from "react";
import { Transaction } from "../transactions/transactions";
import modalJson from "./modal.json";
import "./modal.scss";

interface ModalProps {
  action: MouseEventHandler<HTMLLIElement | HTMLButtonElement>;
  data: Transaction;
}

export const Modal = ({ action, data }: ModalProps): JSX.Element => {

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
  } = data;

  const codes = modalJson.map((code, index) => (
    <li key={code.codeShort}>
      <span>{code.codeShort}</span><span>{code.codeLong}</span>
    </li>
  ));

  return (
    <div className="modal"> 
      <div className="modal__data">
        <p><span>Account No</span><span>{acctNo}</span></p>
        <p><span>Account Name</span><span>{acctName}</span></p>
        <p><span>Account Type</span><span>{acctType}</span></p>
        <p><span>Year</span><span>{year}</span></p>
        <p><span>Month</span><span>{month}</span></p>
        <p><span>Day</span><span>{day}</span></p>
        <p className="modal__text-full"><span>Memo</span><span>{memo}</span></p>
        <p><span>Transaction Type</span><span>{transactionType}</span></p>
        <p><span>Amount</span><span>{amount}</span></p>
        <p><span>Code</span><span>{codeName}</span></p>
      </div>
      <div className="modal__codes">
        <div className="modal__search">
          <div className="modal__live-search">
            <input type="text" />
          </div>
          <div className="modal__btn-container">
            <button onClick={action}>Save</button>
          </div>
        </div>
        <ul className="modal__code-list">
          {codes}
        </ul>
      </div>
    </div>
  );
}
