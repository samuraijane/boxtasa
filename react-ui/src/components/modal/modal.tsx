import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Transaction } from "../transactions/transactions";
import modalJson from "./modal.json";
import "./modal.scss";

interface ModalProps {
  action: Function;  // NOTE not 100% sure this is the right type but TS does not complain
  data: Transaction;
}

interface Codes {
  codeShort: string;
  codeLong: string;
}

export const Modal = ({ action, data }: ModalProps): JSX.Element => {
  const [codes, setCodes] = useState<Codes[]>();
  const [inputValue, setInputValue] = useState("");
  const [selectedCode, setSelectedCode] = useState("");

  useEffect(() => {
    setCodes(modalJson);
  }, []);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
    const updatedCodes = modalJson?.filter(x => x.codeShort.toLowerCase().search(value) !== -1 || x.codeLong.toLowerCase().search(value) !== -1);
    setCodes(updatedCodes);
  };

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    const { value } = e.currentTarget.dataset;
    if (!value) {
      console.error("A value is missing, dude.") // TODO handle error gracefully
      return;
    }
    setSelectedCode(value);
    setInputValue(value);
  };

  const handleSave = () => {
    action(id, selectedCode);
  };

  const _codes = codes?.map(code => (
    <li className={`${selectedCode === code.codeShort ? "modal__selected-code": ""}`} data-value={code.codeShort} key={code.codeShort} onClick={handleClick}>
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
            <input onChange={handleChange} type="text" value={inputValue} />
          </div>
          <div className="modal__btn-container">
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
        <ul className="modal__code-list">
          {_codes}
        </ul>
      </div>
    </div>
  );
}
