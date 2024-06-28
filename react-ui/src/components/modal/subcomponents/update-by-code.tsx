import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { prepBulkData } from "../../../utils";
import { selectFilteredTransactions } from "../../../features/filteredDataSlice";
import { selectCode } from "../../../features/codesSlice";

interface UpdateByCodeProps {
  handleUpdate: Function;
  transactionId: number;
}

export const UpdateByCode = ({ handleUpdate, transactionId }: UpdateByCodeProps) => {
  const filteredTransactions = useSelector(selectFilteredTransactions);
  const codes = useSelector(selectCode);

  const [filteredCodes, setFilteredCodes] = useState(codes);
  const [inputValue, setInputValue] = useState("");
  const [isBulkSave, setIsBulkSave] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");

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

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    const { id, value } = e.currentTarget.dataset;
    if (!id || !value) {
      console.error("A value is missing.") // TODO handle error gracefully
      return;
    }
    setSelectedCode(id);
    setInputValue(value);
  };

  const handleSave = () => {
    if (isBulkSave) {
      const bulkData = prepBulkData(filteredTransactions, selectedCode);
      handleUpdate(bulkData);
      return false;
    }
    handleUpdate({ transactionId, codeId: selectedCode });
  };

  const _codes = filteredCodes?.map(code => {
    const {code_description, code_id, code_name} = code;

    return (
      <li
        className={`${selectedCode === code_name ? "modal__selected-code": ""}`}
        data-id={code_id}
        data-value={code_name}
        key={code_id}
        onClick={handleClick}
      >
        <span>{code_name}</span><span>{code_description}</span>
      </li>
    );
  });

  return (
    <div className="modal__codes">
      <div className="modal__search">
        <div className="modal__live-search">
          <input onChange={handleChange} type="text" value={inputValue} />
        </div>
        <div className="modal__btn-container">
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
      <div>
        <label>Apply code to all found records?</label>
        <input onChange={handleCheckbox} type="checkbox" />
      </div>
      <ul className="modal__code-list">
        {_codes}
      </ul>
    </div>
  );
};
