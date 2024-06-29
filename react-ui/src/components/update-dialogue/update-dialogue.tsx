import { ChangeEvent, useState } from "react";
import { PostTransactionCode, postTransactionCodesInBulk } from "../../features/activeDataSlice";
import { postTransactionCode } from "../../features/activeDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredTransactions } from "../../features/filteredDataSlice";
import { selectCode } from "../../features/codesSlice";
import { AppDispatch } from "../../app/store";
import { prepBulkData } from "../../utils";
import { handleModal } from "../../features/isModalSlice";
import "./update-dialogue.scss";
import { Transaction } from "../../types/interface";
import { TransactionDetail } from "../transaction-detail/transaction-detail";
import { ForCode } from "./subcomponents/for-code/for-code";

export const TransactionUpdateDialogue = ({ activeTransaction }: {activeTransaction: Transaction}) => {
  const codes = useSelector(selectCode);
  const [filteredCodes, setFilteredCodes] = useState(codes);
  const [inputValue, setInputValue] = useState("");
  const [isBulkSave, setIsBulkSave] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const filteredTransactions = useSelector(selectFilteredTransactions);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
    const updatedCodes = codes?.filter(x => x.code_name.toLowerCase().search(value) !== -1 || x.code_description.toLowerCase().search(value) !== -1);
    setFilteredCodes(updatedCodes);
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked: isChecked } = e.target;
    setIsBulkSave(isChecked);
  };

  const handleSave = () => {
    if (isBulkSave) {
      const bulkData = prepBulkData(filteredTransactions, selectedCode);
      handleUpdate(bulkData);
      return false;
    }
    handleUpdate({ transactionId: `${activeTransaction.transaction_id}`, codeId: selectedCode });
  };

  const handleUpdate = async (data: PostTransactionCode | PostTransactionCode[]) => {
    if ((data as PostTransactionCode[]).length) {
      await dispatch(postTransactionCodesInBulk(data as PostTransactionCode[]));
      dispatch(handleModal(false));
    } else {
      const { codeId, transactionId } = data as PostTransactionCode;
      await dispatch(postTransactionCode({ codeId, transactionId }));
      dispatch(handleModal(false));
    }
  };

  return (
    <div className="dialogue">
      <div className="dialogue__subheader">
        <div className="dialogue__inputs-container">
          <div className="dialogue__search">
            <div className="dialogue__live-search">
              <input onChange={handleChange} type="text" value={inputValue} />
            </div>
            <div className="dialogue__btn-container">
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
          <div className="dialogue__bulk">
            <label>Bulk update</label>
            <input onChange={handleCheckbox} type="checkbox" />
          </div>
        </div>
      </div>
      <div className="dialogue__body">
        <div className="dialogue__column dialogue__column--left">
          <TransactionDetail />
        </div>
        <div className="dialogue__column dialogue__column--right">
          <ForCode
            filteredCodes={filteredCodes}
            selectedCode={parseInt(selectedCode)}
            setInputValue={setInputValue}
            setSelectedCode={setSelectedCode}
          />
        </div>
      </div>
    </div>
  );
};
